import { useEffect, useRef } from "react";
import api from '../../api/axiosConfig';
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import './Reviews.css';

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try {
            const response = await api.post("/api/v1/reviews", {reviewBody: rev.value, imdbId: movieId});
    
            const updateReviews = [...reviews, {body: rev.value}];
    
            rev.value = "";
    
            setReviews(updateReviews);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container className="review-container">
            <Row>
                <Col>
                    <h3>Reviews</h3>
                </Col>
            </Row>
            <Row>
                <Col className="mt-2 movie-poster-container">
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                                </Col>
                            </Row>
                            <Row>
                                <Col><hr /></Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((review, index) => {
                            return (
                                <div key={index}>
                                    <Row>
                                        <Col>{review.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col><hr /></Col>
                                    </Row>       
                                </div>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col><hr /></Col>
            </Row>  
        </Container>
    )
}

export default Reviews