var questionsAnswers = [];

$("#addQuestion").on('click',function(e) {
    questionsAnswers.push({
        question: $("#newQuestion").val(),
        answer:  $("#newAnswer").val().replace(/\s+$/, '')
    });
    $("#newQuestion").val("");
    $("#newAnswer").val("");
    $("#ulQuestions").empty();
    questionsAnswers.forEach( (element, i) => {                                                                                    
        questionN = i +1;
        $("#ulQuestions").append("<li><a onClick='setModifyQuestions("+i+")'>"+element.question+"</a></li>");
    });
});

$("#startGameCustom").on('click',function(e) {
    $("#secondContainer").empty();
    questionsAnswers.forEach( (element, i) => {
                                                                                                   
        questionN = i +1;
        $("#secondContainer").append("<div>"
            + "<a id='question"+i+"'>"+questionN+". "+element.question+"</a><br>"
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

function setModifyQuestions(number){
    $("#newQuestion").val(questionsAnswers[number].question);
    $("#newAnswer").val(questionsAnswers[number].answer);
    $("#buttonContainer").append('<a class="btn btn-warning modify" onClick="modifyQuestion">Add Question</a>');
}

function modifyQuestion(number){
    $("#newQuestion").val();
    $("#newAnswer").val();
    $("#buttonContainer").append('<a class="btn btn-warning modify" onClick="modifyQuestion">Add Question</a>');
}