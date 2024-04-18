import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";

import './ReviewStars.css';

export default function ReviewStars({ reviewsByProductId}) {


    if (!reviewsByProductId || reviewsByProductId.length === 0) return <p>No reviews yet</p>


    function averageReviewRating() {
        let totalRating = 0
        for (let review of reviewsByProductId) {
            totalRating += review.rating
        }
        let average = totalRating / reviewsByProductId.length
        return average;
    }

    function starsIcon(avgRating){
        let filledStar = Math.floor(avgRating) // round avg rating down
        let arr =[1,2,3,4,5]
        let starArr = []
        arr.forEach(i => {
            if( i <= filledStar){
                starArr.push(<MdOutlineStar key={i}/>)
            }
            else{
                starArr.push(<MdOutlineStarBorder key={i}/>)
            }
        })
        return starArr
    }


    return (
        <p>{starsIcon(averageReviewRating())}</p>
    )
}
