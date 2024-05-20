import { Review } from "@/types/review";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ratings } from "@/components/common/rating/rating";
import Image from "next/image";
import Link from "next/link";

type Props = { review: Review };

export default function ReviewItem({ review }: Props) {
  return (
    <div className="py-5 flex flex-col gap-5 first-of-type:border-t border-b">
      <div className="flex gap-4">
        <Avatar className="w-[50px] h-[50px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <span className="text-[17px], leading-[20px] font-bold">
            {review.author}
          </span>
          <span className="text-[15px], leading-[18px] text-[#717171]">{`${review.city}, ${review.country}`}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Ratings rating={review.rating} variant="primary" />
        <span>{review.title}</span>
        <div>{review.body}</div>
      </div>
      <div className="w-[96px] h-[96px]">
        <Image
          className="w-[96px] h-[96px] object-cover"
          src={review.imageReviewUrl}
          alt={review.imageReviewUrl}
          width={0}
          height={0}
          sizes="screen"
        />
      </div>
      <span className="text-[#5E5E5E]">
        Purchased item:{" "}
        <Link href={review.productUrl} className="text-[#7F898B] underline">
          {review.productTitle}
        </Link>
      </span>
    </div>
  );
}
