import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { LoremGenerator } from '@/components/lorem-generator';
export function Generators() {

	return (
		<Carousel className="flex flex-col flex-1" >
			<CarouselContent className="h-full">
				<CarouselItem className="lg:basis-1/3"><LoremGenerator type="word"></LoremGenerator> </CarouselItem>
				<CarouselItem className="lg:basis-1/3"><LoremGenerator type="sentence"></LoremGenerator> </CarouselItem>
				<CarouselItem className="lg:basis-1/3"><LoremGenerator type="paragraph"></LoremGenerator> </CarouselItem>
			</CarouselContent>
			<div className="flex gap-10 flex-1 mx-auto lg:hidden">
				<CarouselPrevious />
				<CarouselNext />
			</div>
		</Carousel>
	)
}
