const router = require("express").Router();
const Posts = require("../../models/mobitelProjectsDatabase");

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------- Posting Excell data to the database  --------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/mobitelProjectsDatabasesExcell/upload', (req, res) => {
  const newPost = req.body;
  const user = 'userName';
  // console.log(newPost.length);

  async function run() {
    try {
      const options = { ordered: true };
      const operators = { $set: { currentUser: user } };
      const result = await Posts.insertMany(newPost, options);
    } finally {
      res.status(200).json({
        success: `${newPost.length} Projects Added Successfully!`
      });
    }
  }
  run();

});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = router;
