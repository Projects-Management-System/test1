const router = require("express").Router();
const Posts = require("../../models/vendorProjectsDatabase");


//------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------- Posting Excell data to the database  --------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/vendorProjectsDatabasesExcell/upload', (req, res) => {
  const newPost = req.body;
  // console.log(newPost.length);

  async function run() {
    try {
      const options = { ordered: true };
      const result = await Posts.insertMany(newPost, options);
      // console.log(`${result.length} project documents were inserted`);
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
