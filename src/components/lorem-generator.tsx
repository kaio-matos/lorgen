import { useEffect, useRef, useState } from "react";
import { LoremIpsum } from "lorem-ipsum";
import { CheckIcon, Copy, RefreshCw } from "lucide-react";

import { H2, H3, P } from "@/components/ui/typography";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const lorem = new LoremIpsum({
	sentencesPerParagraph: {
		max: 8,
		min: 4
	},
	wordsPerSentence: {
		max: 16,
		min: 4
	},
});


function splitLoremByDot(str: string) {
	str = str.replaceAll('\n', '')
	const paragraphs = str.split('.').map(s => s.trim())
	paragraphs.pop()
	return paragraphs
}

function splitByBlock(str: string, nBlocks: number) {
	const sentences = splitLoremByDot(str)
	const result: string[][] = []
	const ratio = Math.ceil(sentences.length / nBlocks)

	for (let i = 0; i < sentences.length; i++) {
		const group = Math.floor(i / ratio)
		if (!result[group]) result[group] = []
		result[group].push(sentences[i] + '.')
	}
	return result.map(group => group.join(' ')).join('\n\n')
}

export function LoremGenerator(props: { type: 'word' | 'paragraph' | 'sentence' }) {
	const [number, setNumber] = useState(10)
	const [blocks, setBlocks] = useState(1)
	const [text, setText] = useState('')
	let originalText = useRef("")
	let limit = useRef(100)

	function updateText(n: number) {
		let value = text
		if (props.type === 'word') {
			value = lorem.generateWords(n)
		}
		if (props.type === 'sentence') {
			value = lorem.generateSentences(n)
			// value = `Veniam est ea in elit velit dolore nulla ut consequat aute. Nostrud occaecat officia ut et. Irure consequat in voluptate non duis ad irure. Nisi id cillum duis sint magna deserunt laborum proident reprehenderit officia mollit elit. Ut officia consectetur ea ad officia. Minim est esse dolor labore magna sunt quis ea pariatur ad duis dolore ad sint nisi. Cillum enim officia quis veniam mollit. Exercitation tempor nisi culpa proident laborum est qui commodo ad irure eu deserunt. Eiusmod culpa irure exercitation in sunt ea pariatur Lorem magna quis deserunt pariatur reprehenderit dolore. Veniam sint ut aliqua nostrud.`
		}
		if (props.type === 'paragraph') {
			value = lorem.generateParagraphs(n)
		}
		originalText.current = value
		setText(originalText.current)
		formatText(blocks)
	}

	function formatText(blocks: number) {
		if (props.type === 'sentence') {
			const value = splitByBlock(originalText.current, blocks)
			limit.current = number
			setText(value)
		}
		if (props.type === 'paragraph') {
			const value = splitByBlock(originalText.current, blocks)
			limit.current = number
			setText(value)
		}
	}

	useEffect(() => updateText(number), [])

	const stopTouchPropagation: React.TouchEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation()
	}

	return (
		<div className="flex flex-col h-full gap-2 p-4">
			<div className="flex justify-between">
				<H3>{number} {props.type}s</H3>

				<div className="flex gap-2 items-center">
					<P>{blocks} block(s)</P>
					<Button size="icon" onClick={() => updateText(number)}><RefreshCw /></Button>

					<CopyButton text={text} />
				</div>
			</div>

			{
				(props.type === 'sentence' || props.type === 'paragraph') &&
				<Slider value={[blocks]} onValueChange={(value) => {
					setBlocks(value[0]);
					formatText(value[0])
				}} min={1} max={limit.current} step={1} onTouchStartCapture={stopTouchPropagation}
				/>
			}
			<Slider value={[number]} onValueChange={(value) => {
				setNumber(value[0])
				updateText(value[0])
			}} min={1} max={100} step={1} onTouchStartCapture={stopTouchPropagation}
			/>
			<Textarea readOnly className="whitespace-pre-wrap resize-none h-full" value={text} />
		</div>
	)

}

function CopyButton(props: { text: string }) {
	const [copied, setCopied] = useState(false)
	const timeout = useRef<number>()
	async function onCopy() {
		clearTimeout(timeout.current)
		await navigator.clipboard.writeText(props.text)
		setCopied(true)
		timeout.current = setTimeout(() => setCopied(false), 2000)
	}
	return <Button size="icon" onClick={onCopy}>{copied ? <CheckIcon /> : <Copy />}</Button>
}
