import * as $ from 'jquery';
export const LightTheme = () => {
    $("#darkThemeBtn").show();
    $("#lightThemeBtn").hide();
    $("#darktheme").fadeIn();
    $("#lighttheme").fadeOut(0);
    $(document.documentElement).css("--currentBgCodeColor", "#F7F7F7");
    $(document.documentElement).css("--currentFontCodeColor", "#5888AD");
    $(document.documentElement).css("--oppositeBgCodeColor", "#242C3C");
    $(document.documentElement).css("--oppositeFontCodeColor", "#5888AD");
    $(document.documentElement).css("--currentFontDescColor", "#486982");
    $(document.documentElement).css("--currentBgSdColor", "rgb(255,255,255,.8)");
    $(document.documentElement).css("--currentBgSdGradColor", "rgb(255,255,255,.8)");
    $(document.documentElement).css("--currentUEFilter", "invert(0%)");
    $(document.documentElement).css("--oppositeUEFilter", "invert(100%)");
    $(document.documentElement).css("--currentBgCommentColor", "rgba(255,255,255,1)");
    $(document.documentElement).css("--currentCommentColor", "#D85786");
};

export const DarkTheme = () => {
    $("#lightThemeBtn").show();
    $("#darkThemeBtn").hide();
    $("#lighttheme").fadeIn();
    $("#darktheme").fadeOut(0);
    $(document.documentElement).css("--currentBgCodeColor", "#242C3C");
    $(document.documentElement).css("--currentFontCodeColor", "#5888AD");
    $(document.documentElement).css("--oppositeBgCodeColor", "#F7F7F7");
    $(document.documentElement).css("--oppositeFontCodeColor", "#5888AD");
    $(document.documentElement).css("--currentFontDescColor", "#4dd0e1");
    $(document.documentElement).css("--currentBgSdColor", "rgb(40,49,66,.8)");
    $(document.documentElement).css("--currentBgSdGradColor", "linear-gradient(90deg, rgb(0,0,0,.3) 0%, rgb(0,0,0,.3) 40%, rgba(0,0,0,0) 100%)");  
    $(document.documentElement).css("--currentUEFilter", "invert(100%)");
    $(document.documentElement).css("--oppositeUEFilter", "invert(0%)");
    $(document.documentElement).css("--currentBgCommentColor", "rgba(59,72,97,1)");
    $(document.documentElement).css("--currentCommentColor", "#d81b60");
}

