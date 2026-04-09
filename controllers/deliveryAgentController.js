const deliveryService = require("../services/deliveryServices");
const { successResponse, errorResponse } = require("../utils/apiResponce");

// SIGNUP (OTP)
exports.signUpDelivery = async (req, res) => {
  try {
    const data = await deliveryService.createDeliveryAgent(req.body);
    return successResponse(res, "Signup successful", data, 201);
  } catch (err) {
    return errorResponse(res, err.message, null, err.statusCode || 500);
  }
};

// CRUD
exports.getAllAgents = async (req, res) => {
  const data = await deliveryService.getAllAgents();
  return successResponse(res, "Agents fetched", data);
};

exports.getAgentById = async (req, res) => {
  const data = await deliveryService.getAgentById(req.params.id);
  return successResponse(res, "Agent fetched", data);
};

exports.patchAgent = async (req, res) => {
  const data = await deliveryService.patchAgent(req.params.id, req.body);
  return successResponse(res, "Agent updated", data);
};

exports.deleteAgent = async (req, res) => {
  const data = await deliveryService.deleteAgent(req.params.id);
  return successResponse(res, "Agent deleted", data);
};

exports.patchCurrentAgent = async (req, res) => {
  const data = await deliveryService.patchCurrentAgent(req.user.id, req.body);
  return successResponse(res, "Profile updated", data);
};

exports.deleteCurrentAgent = async (req, res) => {
  const data = await deliveryService.deleteCurrentAgent(req.user.id);
  return successResponse(res, "Account deleted", data);
};