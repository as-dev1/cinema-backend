import Cart from "../models/cart.model.js";

export const getUserCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.find({ user: userId })
            .where("status")
            .equals("reserved")
            .populate("user", "firstName lastName")
            .populate({
                path: "projection",
                populate: {
                    path: "movie",
                    select: "image_url name genre duration",
                },
            });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserReservation = async (req, res) => {
    try {
        const userId = req.user._id;

        const reservation = await Cart.find({ user: userId })
            .where("status")
            .ne("reserved")
            .populate("user", "firstName lastName")
            .populate({
                path: "projection",
                populate: {
                    path: "movie",
                    select: "image_url name genre duration",
                },
            });

        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createReservation = async (req, res) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const cancelReservation = async (req, res) => {
    try {
        const { cartId } = req.params;
        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            { status: "cancelled" },
            { new: true }
        );
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const markAsViewed = async (req, res) => {
    try {
        const { cartId } = req.params;

        const cart = await Cart.findById(cartId).populate("projection");

        if (!cart) {
            return res.status(404).json({ message: "Reserved projection not found" });
        }

        if (cart.projection && new Date(cart.projection.starting_at) < new Date()) {
            const updatedCart = await Cart.findByIdAndUpdate(
                cartId,
                { status: "watched" },
                { new: true }
            );
            res.json(updatedCart);
        } else {
            res.status(400).json({ message: "Cannot mark as viewed before projection starts" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
