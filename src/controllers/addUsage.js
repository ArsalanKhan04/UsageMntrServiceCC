const express = require('express');
const mongoose = require('mongoose');
const Usage = require('../models/usage');


const addUsage = async(req, res) => {
  try {
    console.log('req.body:', req.body);
    const { user_id, usage } = req.body;

    if (!user_id){
      return res.status(400).json({message: 'User ID is required'});
    }
    if (!usage){
      return res.status(400).json({message: 'Usage is required'});
    }
    if (!user_id || !usage) {
      return res.status(400).json({message: 'User ID and usage are required'});
    }


    
    // Create a new usage record
    const newUsage = new Usage({
      user_id: user_id,
      usage: parseFloat(usage), // Ensure usage is a number (could be a decimal)
      date: new Date(), // Default to the current date and time
    });

    // Save the usage record to the database
    await newUsage.save();

    // Return success response
    return res.status(201).json({
      message: 'Usage data added successfully',
      usageRecord: newUsage,
    });

  } catch (err) {
    console.error('Error Adding usage data:', err);
    return res.status(500).json({message: 'Server error'});
  }


};

module.exports = { addUsage };

