questionsAnswers = [
    {
        question: "What do you do when giving yourself a good advice?",
        answer: "Seldom follow it!"
    },
    {
        question: "What do you do when you make The Queen of Hearts mad?",
        answer: "Off with my head?"
    },
    {
        question: "What's the name of the cat that has no body but has a head and has no head but has body?",
        answer: "Cheshire"
    }
]

$("#addQuestion").on('click',function(e) {
    questionsAnswers.push({
        question: $("#newQuestion").val(),
        answer:  $("#newAnswer").val()
    });
    $("#newQuestion").val("");
    $("#newAnswer").val("");
});

$("#goToGame").on('click',function(e) {
    $("#secondContainer").empty();
    questionsAnswers.forEach( (element, i) => {
        questionN = i +1;
        $("#secondContainer").append("<div>"
            + "<a id='question"+i+"'>"+questionN+". "+element.question+"</a><br>"
            + "<input type='text' class='answers' id='answer"+i+"' attr-number='"+i+"'>"
            + "</div><br>"
        )
    });
    $(".answers").on('keypress',function(e) {
        if(e.which == 13) {
            if($(this).val()== questionsAnswers[$(this).attr("attr-number")].answer)
                console.log("Respuesta Correcta")
                $(this).prop("disabled", true );
        }
    });
    $("#firstContainer").css("display", "none");
    $("#secondContainer").css("display", "block");
});

