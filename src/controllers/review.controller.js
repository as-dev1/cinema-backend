import Review from "../models/review.model.js";
import Cart from "../models/cart.model.js";

export const getReviewForMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const reviews = await Review.find({ movie: movieId })
            .populate("user", "firstName lastName")
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createReview = async (req, res) => {
    try {
        const { movie, user, rating, comment } = req.body;

        if (!movie || !user || !rating || !comment) {
            return res.status(400).json({ message: "You must fill all fields" });
        }

        const getStatus = await Cart.findOne({ user, status: "watched" }).populate({
            path: "projection",
            select: "movie",
        });

        if (!getStatus) {
            return res
                .status(400)
                .json({ message: "You cannot review this movie until you have watched it" });
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
