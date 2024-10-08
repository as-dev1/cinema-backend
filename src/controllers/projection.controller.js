import Projection from "../models/projection.model.js";

export const getAllProjections = async (req, res) => {
    try {
        const projections = await Projection.find().populate("movie").sort({ starting_at: 1 });
        res.json(projections);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// just for easier adding in mongodb
export const createProjection = async (req, res) => {
    const projection = new Projection(req.body);
    await projection.save();
    res.json(projection);
};
