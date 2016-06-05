$("document").ready(function () {
    
    console.log("select");
    
    $(".faction-select").click(function(){
        $(".class-overlay").hide();
        
        var title= $(this).children(".class-title-info").html();
        var info = $(this).children(".class-description-info").html();
        var classid = $(this).children(".class-id").html();
       
        $(".class-overlay").find(".class-title").find("h1").html(title);
        $(".class-overlay").find(".class-description").html(info);
        $(".class-overlay").find("input").attr("id",classid);
        
        $(".class-overlay").fadeIn();        
    });
    
    $(".class-close").click(function(){
        $(".class-overlay").fadeOut();
    });
});
