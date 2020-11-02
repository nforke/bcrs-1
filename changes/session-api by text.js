/**
 * ==============================================================================
 * Sprint 2 -
 * API: FindSelectedSecurityQuestions
 * Author: Joann Saeou
 * Date: 10/29/2020
 * ==============================================================================
 **/

router.get('/:userName/securityQuestions/_id', async(req, res) => {
  try {
      User.findOne({ 'userName': req.params.userName }, function(err, user) {
          if (err) {
              console.log(err);
              const FindSelectedSecurityQuestionsMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
              res.status(500).send(FindSelectedSecurityQuestionsMongodbErrorResponse.toObject());

          } else {
              console.log(user);
              const FindSelectedSecurityQuestionsResponse = new BaseResponse('200', 'Query successful', user.selectedSecurityQuestions);
              res.status(200).send(FindSelectedSecurityQuestionsResponse.toObject());
          }
      })
  } catch (e) {
      console.log(e);
      const FindSelectedSecurityQuestionsCatchResponse = new ErrorResponse('500', 'Internal server error', e);
      res.status(500).send(FindSelectedSecurityQuestionsCatchResponse.toObject());
  }
});

/**
 *
 * --Find Security Questions by ID--
 *
 */

router.get('/securityQuestions/findById', function(req, res) {
    try {
    User.findOne({ "username": req.body.username }, function(err, user) {
        if (err) {
            const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err)
            res.json(ErrorMessage.toObject())
        } else {
            const SuccessMessage = new BaseResponse('200', 'GET Request Success', user.username/* Will Be selectedSecuriyQuestions */)
            res.json(SuccessMessage.toObject())
        }
    })
} catch (e) {
    const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', e)
    res.json(ErrorMessage.toObject())
}
})

//from james' session
/**
 *
 * VERIFY SECURITY QUESTIONS
 * by JB
 *
 */
//router.post('/verify/users/:username/security-questions', async(req, res) => {
  router.post('/verify/users/:username/selectedSecurityQuestions', async(req, res) => {
  try{
      User.findOne({'username': req.params.username}, function(err, user){
          if(err){
              console.log(err);
              const verifySecurityQuestionsMondoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
              res.status(500).send(verifySecurityQuestionsMondoDbErrorResponse.toObject());
          } else {

              //Find the selected security question objects in the DB and assign them to a variable
              const selectedSecurityQuestionOne = user.securityQuestions.find(question => question.questionText === req.body.questionText1);
              const selectedSecurityQuestionTwo = user.securityQuestions.find(question2 => question2.questionText === req.body.questionText2);
              const selectedSecurityQuestionThree = user.securityQuestions.find(question3 => question3.questionText === req.body.questionText3);


              //Take the object from above and compare the answer from the db to the answer from the user.
              const isValidAnswerOne = selectedSecurityQuestionOne.answerText === req.body.answerText1;
              const isValidAnswerTwo = selectedSecurityQuestionTwo.answerText === req.body.answerText2;
              const isValidAnswerThree = selectedSecurityQuestionThree.answerText === req.body.answerText3;

              //Check if all three questions are correct. If so, return a success.
              if(isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree){
                  console.log(`User ${user.username} answer their security questions correctly.`);
                  const validSecurityQuestionResponse = new BaseResponse('200', 'Success!', user);
                  res.json(validSecurityQuestionResponse.toObject());
                  //else return a success with failure.
              } else {
                  console.log(`User ${user.username} did not answer their security questions correctly.`);
                  const invalidSecurityQuestionsResponse = new BaseResponse('200', 'Error', user);
                  res.json(invalidSecurityQuestionsResponse.toObject());
              }
          }
      })

  } catch(e){
      console.log(e);
      const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
      res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
  }
});

james in user
/**
 *
 * --Find Security Questions by ID--
 * Created by BM
 */

router.get('/securityQuestions/findById', function(req, res) {
  try {
  User.findOne({ "username": req.body.username }, function(err, user) {
      if (err) {
          const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err)
          res.json(ErrorMessage.toObject())
      } else {
          const SuccessMessage = new BaseResponse('200', 'GET Request Success', user.username/* Will Be selectedSecuriyQuestions */)
          res.json(SuccessMessage.toObject())
      }
  })
} catch (e) {
  const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', e)
  res.json(ErrorMessage.toObject())
}
})
