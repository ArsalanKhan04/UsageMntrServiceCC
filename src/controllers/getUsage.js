const express = require('express');
const mongoose = require('mongoose');
const  Usage = require('../models/usage');


const getUsage = async(req, res) => {
  try {
    const userId = req.params.UserId || req.query.UserId;
    if (!userId) {
      return res.status(400).json({message: 'User ID is required'});
    }

    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0); // Set to midnight (start of day)
    
    const endOfDay = new Date(startOfDay);
    endOfDay.setUTCHours(23, 59, 59, 999); // Set to 11:59:59.999 (end of day)

    const usageRecords = await Usage.find({
      user_id: userId,
      date: { $gte: startOfDay, $lte: endOfDay }
    }).exec();

    const totalUsageToday = usageRecords.reduce((sum, record) => sum + record.usage, 0);
    

    // Add the total usage for today to the response
    return res.status(200).json({
      usageRecords,
      totalUsageToday,
    });


  } catch (err) {
    console.error('Error fetching usage data:', err);
    return res.status(500).json({message: 'Server error'});
  }


};

module.exports = { getUsage };
