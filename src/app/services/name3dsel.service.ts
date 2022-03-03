import * as $ from "jquery";

export default class Selected3DName{

    setActive(elem3d: any, elem2d: any){
        $("#name_en, #name_cn, #name_kr, #name_scong, #name_osc, #name_owl").removeClass("activeName");
        $(`#${elem3d}`).addClass("activeName");
        $(`#changeFontBtn`).html(elem2d);
    }
}