const express = require("express");
const Issue = require("../models/issues");
const issueRouter = express();


//DELETE ISSUE API
issueRouter.delete('/issues/delete/:issueId', async (req, res) => {
    const { issueId } = req.params;
  
    try {
      const deletedIssue = await Issue.findByIdAndDelete(issueId);
  
      if (!deletedIssue) {
        return res.status(404).json({ error: 'Issue not found' });
      }
  
      res.json({ message: 'Issue deleted successfully', issue: deletedIssue });
    } catch (err) {
    //   console.error(err);
      res.status(400).json({ error: 'Failed to delete issue', details: err.message });
    }
  });
  

//UPDATE ISSUE API
issueRouter.patch("/issues/update/:issueId", async (req, res) => {
    const { issueId } = req.params;
    const { title, description, status, priority } = req.body;
  
    try {
      const updatedIssue = await Issue.findByIdAndUpdate(
        issueId,
        {
          title,
          description,
          status,
          priority
        },
        {
          new: true,       // return the updated document
          runValidators: true // enforce schema validation during update
        }
      );
  
      if (!updatedIssue) {
        return res.status(404).json({ error: 'Issue not found' });
      }
  
      res.json(updatedIssue);
    } catch (err) {
    //   console.error(err);
      res.status(400).json({ error: 'Failed to update issue', details: err.message });
    }
  });
  

//CREATE ISSUE API
issueRouter.post('/issues/create', async (req, res) => {
    try {
      const { title, description, status, priority } = req.body;
  
      const newIssue = new Issue({
        title,
        description,
        status,
        priority
      });
  
      const savedIssue = await newIssue.save();
      res.status(201).json(savedIssue);
    } catch (err) {
    //   console.error(err);
      res.status(400).json({ error: 'Failed to create issue', details: err.message });
    }
  });

//FIND ALL ISSUES AND RETURN API
// Add this route to your Express server

issueRouter.get('/issues/getAll', async (req, res) => {
    try {
      const issues = await Issue.find().sort({ createdAt: -1 }); // latest first
      res.json(issues);
    } catch (err) {
    //   console.error(err);
      res.status(500).json({ error: 'Failed to retrieve issues', details: err.message });
    }
  });
  

//Get All Issues with similar priority , i.e. low, medium, high
issueRouter.get('/issues/:priority', async (req, res) => {
    const { priority } = req.params;
  
    if (!priority) {
      return res.status(400).json({ error: 'Priority is required as a query parameter' });
    }
    // Optional: validate input to match allowed enum values
    const validPriorities = ['Low', 'Medium', 'High'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority value' });
    }
  
    try {
      const filteredIssues = await Issue.find({ priority: priority}).sort({ createdAt: -1 });
      res.json(filteredIssues);
    } catch (err) {
    //   console.error(err);
      res.status(500).json({ error: 'Failed to fetch issues', details: err.message });
    }
  });
  


  module.exports = issueRouter;