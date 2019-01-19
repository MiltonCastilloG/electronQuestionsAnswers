var questionsAnswers = [];

$("#returnToFirst").click(function(e) {
    $("#firstContainer").css("display", "block");
    $("#secondContainer").css("display", "none");
});

$("#saveSet").on('click', function(e) {
    WriteFile(JSON.stringify(questionsAnswers)).then( (result) =>{
        alert(result);
    });
})

$("#addQuestion").on('click',function(e) {
    if($("#newQuestion").val().replace(/\s+$/, '')=='' || $("#newAnswer").val().replace(/\s+$/, '')==''){
        alert("Insert a question and an answer.")
    }
    else{
        questionsAnswers.push({
            question: $("#newQuestion").val(),
            answer:  $("#newAnswer").val().replace(/\s+$/, '')
        });
        updateModifyQuestions();
    }
    
    $("#newQuestion").val("");
    $("#newAnswer").val("");
});

$("#startGame").on('click',function(e) {
    $("#gameMain").empty();
    questionsAnswers.forEach( (element, i) => {                                                                                       
        questionN = i +1;
        $("#gameMain").append("<div>"
            + "<a style='text-decoration: none' id='question"+i+"'>"+questionN+". "+element.question+"</a><br>"
            + "<input type='text' class='answers' id='answer"+i+"' attr-number='"+i+"'><a class='answerResult' id='result"+i+"'></a>"
            + "</div><br>"
        )
    });
    $(".answers").on('keypress',function(e) {
        if(e.which == 13) {
            var answerNum = $(this).attr("attr-number");
            if($(this).val().replace(/\s+$/, '')== questionsAnswers[answerNum].answer){
                $(this).prop("disabled", true );
                $("#result"+answerNum).html("&#10004");
            }
            else{
                $("#result"+answerNum).html("&#10008");
            }
        }
    });
    $("#firstContainer").css("display", "none");
    $("#secondContainer").css("display", "block");
});

$("#selectJSON").on('click',function(e) {
    ReadFile(selectedFile).then((results)=>{
        var parsedJSON = $.parseJSON(results);
        var newQuestionsAnswers = [];
        parsedJSON.forEach(function(value, index){
            if(value.question != undefined && value.answer != undefined)
                newQuestionsAnswers.push(value);
        });
        if(newQuestionsAnswers.length < parsedJSON.length && newQuestionsAnswers.length > 0){
            questionsAnswers = newQuestionsAnswers;
            alert("Filtered "+(parsedJSON.length-newQuestionsAnswers.length)+" elements with incopatible format")
        }
        else if (newQuestionsAnswers.length == 0)
            alert("Failed to load JSON, no element found with keys question and answer")
        else
            questionsAnswers = newQuestionsAnswers;
        updateModifyQuestions();
    });
});

function setModifyQuestions(number){
    $(".modify").remove();
    $("#newQuestion").val(questionsAnswers[number].question);
    $("#newAnswer").val(questionsAnswers[number].answer);
    $("#buttonContainer").append('<a class="btn btn-info modify" onClick="modifyQuestion('+number+')">Modify Question</a>');
}

function modifyQuestion(number){
    questionsAnswers[number] = {
        question: $("#newQuestion").val(),
        answer: $("#newAnswer").val().replace(/\s+$/, '')
    }
    $(".modify").remove();
    updateModifyQuestions();
    $("#newQuestion").val(""),
    $("#newAnswer").val("")
}

function updateModifyQuestions(){
    $("#ulQuestions").empty();
    questionsAnswers.forEach( (element, i) => {                                                                                    
        $("#ulQuestions").append("<li><a onClick='setModifyQuestions("+i+")'>"+element.question+"</a></li>");
    });
}