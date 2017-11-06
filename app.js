/*-----------------------------------------------------------------------------
A Grievane system bot Ernst and Young Hackathon for real-estate use case using the Microsoft Bot Framework. 
Datasets was provided by E&Y org.
JUST SEARCH ON SKYPE: fullon12 and chat right now!!
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var builder_cognitiveservices = require("botbuilder-cognitiveservices");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: 'Use your app-id',
    appPassword: 'use your token/password',
    stateEndpoint: process.env.BotStateEndpoint,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());



var bot = new builder.UniversalBot(connector);


var recognizer = new builder_cognitiveservices.QnAMakerRecognizer({
                knowledgeBaseId: 'your id', 
    subscriptionKey: 'your password'});

var basicQnAMakerDialog = new builder_cognitiveservices.QnAMakerDialog({
    recognizers: [recognizer],
                defaultMessage: "Oops! I don't know about that :( but I will get back with response",
                qnaThreshold: 0.3}
);

bot.dialog('/', basicQnAMakerDialog);


////// check for the non responding answers..

basicQnAMakerDialog.invokeAnswer = function (session, recognizeResult, threshold, noMatchMessage) {
        var qnaMakerResult = recognizeResult;
        session.privateConversationData.qnaFeedbackUserQuestion = session.message.text;
        if (qnaMakerResult.score >= threshold && qnaMakerResult.answers.length > 0) {
            if (basicQnAMakerDialog.isConfidentAnswer(qnaMakerResult) || basicQnAMakerDialog.qnaMakerTools == null) {
                basicQnAMakerDialog.respondFromQnAMakerResult(session, qnaMakerResult);
                basicQnAMakerDialog.defaultWaitNextMessage(session, qnaMakerResult);
            }
            else {
                basicQnAMakerDialog.qnaFeedbackStep(session, qnaMakerResult);
            }
        }
        else {
            
            noMatch(session, noMatchMessage, qnaMakerResult);
        }
    };
    // designing our model for low equalizer model
basicQnAMakerDialog.invokeAnswer = function (session, recognizeResult, threshold, noMatchMessage) {
        var qnaMakerResult = recognizeResult;
        session.privateConversationData.qnaFeedbackUserQuestion = session.message.text;
        if (qnaMakerResult.score >= threshold && qnaMakerResult.answers.length > 0) {
            if (basicQnAMakerDialog.isConfidentAnswer(qnaMakerResult) || basicQnAMakerDialog.qnaMakerTools == null) {
                basicQnAMakerDialog.respondFromQnAMakerResult(session, qnaMakerResult);
                basicQnAMakerDialog.defaultWaitNextMessage(session, qnaMakerResult);
            }
            else {
                basicQnAMakerDialog.qnaFeedbackStep(session, qnaMakerResult);
            }
        }
        else {
            // Overridden case with this method
            noMatch(session, noMatchMessage, qnaMakerResult);
        }
};
function noMatch(session, noMatchMessage, qnaMakerResult) {
            session.beginDialog('/offer_transfer');
            
};

basicQnAMakerDialog.respondFromQnAMakerResult = function (session, qnaMakerResult) {
    
       
        var response = qnaMakerResult.answers[0].answer.split('/t ');
        
        session.send(response[0]);
        
     
    };
    
    bot.dialog('/offer_transfer', [
    function (session) {
        session.send("Sorry! I don't what it is?,but I will let you within 2-5 hrs or you can contact to our  live human-support here: file:///D:/Website%20Development%20Work/hackathon/helpdesk.html#contact");
        builder.Prompts.time(session, "Please provide a date and time too.I want to deliver it fast :) (e.g.: June 6th at 5pm)");
    },
    function (session, results) {
        session.dialogData.Date = builder.EntityRecognizer.resolveTime([results.response]);
        builder.Prompts.number(session,"Can you categorize it ? <br/> I mean it's related to tax/property_dealing or which field? <br/> I am just getting curious :D ??");
    },
    function (session, results) {
        session.dialogData.partySize = results.response;
        builder.Prompts.text(session, "Tell me the e-mail/phone no.to contact you?");
    },
    function (session, results) {
        session.dialogData.yourname = results.response;

        
        session.send(`Token confirmed. Token details: <br/>Date/Time: ${session.dialogData.Date} <br/> size: ${session.dialogData.partySize} <br/> name: ${session.dialogData.yourname},`);
        session.endDialog();
    }
]);
    


