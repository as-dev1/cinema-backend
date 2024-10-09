import Review from "../models/review.model.js";

export const getReviewForMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const reviews = await Review.find({ movie: movieId }).populate(
            "user",
            "firstName lastName"
        );
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// TODO need improvement based of project requirements
export const createReview = async (req, res) => {
    try {
        const { movie, user, rating, comment } = req.body;

        if (!movie || !user || !rating || !comment) {
            return res.status(400).json({ message: "You must fill all fields" });
        }

        const existingReview = await Review.findOne({ movie, user });
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this movie" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const review = new Review(req.body);
        await review.save();
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
