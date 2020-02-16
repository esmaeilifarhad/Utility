//--------------------------------------------------------------------Utility
function calDayOfWeek(date) {
    var mounth = ""
    var rooz = ""
    var arrayDate = date.split("/")
    mounth = (parseInt(arrayDate[1]) <= 9) ? "0" + parseInt(arrayDate[1]) : parseInt(arrayDate[1])
    rooz = (parseInt(arrayDate[2]) <= 9) ? "0" + parseInt(arrayDate[2]) : parseInt(arrayDate[2])

    date = arrayDate[0] + mounth + rooz;

    //date = date.replace(/\//g, '');
    date = date.substr(date.length - 6); // 13980203=> 980203

    const m = moment();
    const numberWeek = moment(date, 'jYYjMMjDD').weekday();
    let day;
    switch (numberWeek) {
        case 0:
            day = "یکشنبه";
            break;
        case 1:
            day = "دوشنبه";
            break;
        case 2:
            day = "سه شنبه";
            break;
        case 3:
            day = "چهارشنبه";
            break;
        case 4:
            day = "پنج شنبه";
            break;
        case 5:
            day = "جمعه";
            break;
        case 6:
            day = "شنبه";
    }
    return day;
}
//980809|13980809  =>1398/08/09  input parameter
function foramtDate(str) {
    if (str == undefined) {
        return "undefined"
    }
    if (str.length == 6) {
        return "13" + str.slice(0, 2) + "/" + str.slice(2, 4) + "/" + str.slice(4, 6)
    }
    if (str.length == 8) {
        return str.slice(0, 4) + "/" + str.slice(4, 6) + "/" + str.slice(6, 8)
    }

}
function foramtTime(str) {
    if (str == undefined) {
        return "undefined"
    }

        return str.slice(0,2) + ":" + str.slice(2, 4) + ":" + str.slice(4,6)
    

}
function splitString(str, char) {
    
    if (str == null) return ""
    return str.split(char)
}
//سه رقم سه رقم جدا کنه برای پول   SeparateThreeDigits
function SeparateThreeDigits(str) {
    var x = parseInt(str);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // return parseInt(str);

}
function removeComma(str) {
    
    var noCommas = str.replace(/,/g, '')
    //  asANumber = +noCommas;
    return noCommas
}
function removeLastChar(str) {
    return str.slice(0, -1)
}
function removeCountChar(str, n) {
    return str.slice(0, -n)
}
function numberDaysTwoDate(firstDate, secondDate) {

    var firstDate = moment(firstDate, 'jYYYY/jM/jD ').format('M/D/YYYY')//'1/1/2014'
    var secondDate = moment(secondDate, 'jYYYY/jM/jD ').format('M/D/YYYY')//'1/1/2014'


    var startDay = new Date(firstDate);
    var endDay = new Date(secondDate);
    var millisecondsPerDay = 1000 * 60 * 60 * 24;

    var millisBetween = startDay.getTime() - endDay.getTime();
    var days = millisBetween / millisecondsPerDay;

    // Round down.
    return (Math.floor(days));

}
function todayShamsy() {

    const m = moment();
    var today = moment().format('jYYYY/jM/jD');//Today
    return today;
}
function todayShamsy8char() {
    const m = moment();
    today = moment().format('jYYYY/jM/jD');//Today


    var todayarray = today.split("/")
    mounth = (parseInt(todayarray[1]) <= 9) ? "0" + parseInt(todayarray[1]) : parseInt(todayarray[1])
    rooz = (parseInt(todayarray[2]) <= 9) ? "0" + parseInt(todayarray[2]) : parseInt(todayarray[2])
    year = todayarray[0].substring(2, 4)
    today = "13" + year + "" + mounth + "" + rooz
    return today
}
function CurrentTime() {
    var d = new Date();
    var hour = d.getHours();  /* Returns the hour (from 0-23) */
    var minute = d.getMinutes();  /* Returns the minutes (from 0-59) */
    var second = d.getSeconds();
    return (hour <= 9 ? "0" + hour : hour) + "" + (minute <= 9 ? "0" + minute : minute) + "" + (second <= 9 ? "0" + second : second)
}
/*
برای تگ های ورودی از روش زیر استفاده کن
<input type='text' name='Budget' onkeyup='changeInputToThreeDigit(this)'/>

برای گرفتن مقدار بصورت عدد از روش زیر استفاده کن
 var Budget = $("#takhsisBudget input[name=Budget]").val();
Budget=parseInt(removeComma(Budget))
*/
function changeInputToThreeDigit(thiss) {

    var x = removeComma(thiss.value)
    x = SeparateThreeDigits(x)
    thiss.value = (x == 'NaN' ? 0 : x)
}
//---------------------
/*
 Math.round(2.4) = 2
  Math.round(2.5) = 3
*/
//---------------------------------------------------CRUD
function create_Record(Obj, NameLis) {
    
    return new Promise(resolve => {
        $pnp.sp.web.lists.getByTitle(NameLis).items.add(Obj).then(function (item) {
            resolve(item);
        }).catch(error => {
            console.log(error)
            resolve("error");
        })
    });
}
function update_Record(ID, Obj, NameList) {
    debugger
    ID = parseInt(ID)

    return new Promise(resolve => {
        var list = $pnp.sp.web.lists.getByTitle(NameList);
        list.items.getById(ID).update(Obj).then(function (item) {
            resolve(item);
        }).catch(error => {
            console.log(error)
            resolve("error");
        });
    });
}
function get_Records(Obj) {

    if (Obj.Filter == undefined) {
        Obj.Filter = ""
    }
    if (Obj.OrderBy == undefined) {
        Obj.OrderBy = ""
    }
    if (Obj.Is_Increase == undefined) {
        Obj.Is_Increase = ""
    }

    return new Promise(resolve => {
        $pnp.sp.web.lists.
            getByTitle(Obj.NameList).
            items.
            select(Obj.Select).
            filter(Obj.Filter).
            expand(Obj.Expand).
            orderBy(Obj.OrderBy, Obj.Is_Increase).
           // top(1).
            get().
            then(function (items) {
                resolve(items);
            });
    });
}
function get_RecordByID(Obj) {

    if (Obj.Filter == undefined) {
        Obj.Filter = ""
    }

    return new Promise(resolve => {
        $pnp.sp.web.lists.
            getByTitle(Obj.NameList).
            items.
            getById(Obj.ID).
            select(Obj.Select).
            expand(Obj.Expand).
            get().
            then(function (item) {
                resolve(item);
            });
    });
}
//-----------------------------------------------Service
function service(objHeader,objData) {

    return new Promise(resolve => {
        var serviceURL =objHeader.serviceURL// "https://portal.golrang.com/_vti_bin/SPService.svc/ICTRequestTadarokat"
        var request = objData.request//{ CID: CurrentCID, Date: myDate, PortalReqHeaderID: PortalReqHeaderID, Kalasn: Kalasn, BuyStock: BuyStock, DarkhastKonandehID: DarkhastKonandehID, TaeedKonandehID: TaeedKonandehID, TasvibKonandehID: TasvibKonandehID, Tozih: Tozih }
        // {"CID":"50","Date":"980917","PortalReqHeaderID":"68","Kalasn":"7.1","BuyStock":2}
        $.ajax({
            type: "POST",
            url: serviceURL,
            contentType: "application/json; charset=utf-8",
            xhrFields: {
                'withCredentials': true
            },
            dataType: "json",
            data: JSON.stringify(request),
            //processData: false,
            success: function (data) {

               resolve(data)
            },
            error: function (a) {
                console.log(a);
            }
        });
    })
}
//------------------------------------------------------------------------
function sanje(productCode, category) {
    /*
    جهت افزودن لاگین کاربر در انتهای کد، تابع sanje(productCode, 1) قرار می‌دهیم و در صورت ویرایش کاربر،
     تابع sanje(productCode, 4) را در انتها اضافه می‌کنیم.
    */
    const date = new Date().toISOString().split('T')[0];
    const inCompany = sessionStorage.CName.trim();
    const outCompany = sessionStorage.CName.trim();
    const value = 1;
    const categoryDetails = (category == 1 ? "Login" : "Data Update")
    const userCode = sessionStorage.PLoginName.split('\\')[1]

    var URL = "https://gig-dc1-g310.gig.holdings/Portal/PortalUpdate?ProductCode=" + productCode + "+&UserCode=" + userCode +
        "&Date=" + date + "&Category=" + category + "&Category_Details=" + categoryDetails + "&Value=" + value +
        "&InCompany=" + inCompany + "&OutCompany=" + outCompany

    $.ajax({
        type: "Get",
        url: URL,
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            'withCredentials': true
        },
        dataType: "json",
        // data: JSON.stringify(request),
        //processData: false,
        success: function (data) {

            resolve(data);
            // console.log(data);

        },
        error: function (a) {

            console.log(a);
        }
    });





    // const date = new Date().toISOString().split('T')[0];
    // const inCompany = sessionStorage.CName.trim();
    // const outCompany = sessionStorage.CName.trim();
    // const value = 1;
    // const categoryDetails = (category == 1 ? "Login" : "Data Update")
    // const userCode = sessionStorage.PLoginName.split('\\')[1]
    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://gig-dc1-g310.gig.holdings/Portal/PortalUpdate?ProductCode=" + productCode + "+&UserCode=" + userCode +
    //         "&Date=" + date + "&Category=" + category + "&Category_Details=" + categoryDetails + "&Value=" + value +
    //         "&InCompany=" + inCompany + "&OutCompany=" + outCompany,
    //     "method": "GET",
    //     "headers": {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         "Accept": "*/*"
    //     }
    // }

    // 
    // $.ajax(settings).done(function (response) {
    //     
    //     console.log(response);
    // });


}
//-----------------------
//آیا کاربر عضو گروه خاصی هست یا نه اگر بود true بر میگرداند
function IsCurrentUserMemberOfGroup(portalAddress, id) {
    /*
    تجهیزات - انتخاب جانشین    104 
    105   تجهیزات - مجاز به انتخاب همه تجهیزات   
    */
    return new Promise(resolve => {
        var grpName = [id];
        var isUserInGroups = false;
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/currentuser/groups?$select=Id";
        $.ajax({
            url: url,
            type: "GET",
            async: false,
            headers: {
                "Accept": "application/json;odata=verbose",
            },
            success: function (data) {

                for (var i = 0; i < grpName.length; i++) {
                    for (var j = 0; j < data.d.results.length; j++) {
                        if (grpName[i] == data.d.results[j].Id) {
                            isUserInGroups = true;
                        }
                        else {

                        }
                    }
                }
                resolve(isUserInGroups)
            },
            error: function (error) {

                //console.log(JSON.stringify(error));  
            }
        });
    });

}
/*
نمایش کاربران موجود در گروه
کاربران موجود در گروه را نمایش میدهد
*/
function GetUsersInGroup(portalAddress, id) {
    //  کاربران ثبت کننده تخفیف    223
    return new Promise(resolve => {
        $.ajax({
            url: portalAddress + "/_api/web/sitegroups/getbyId(" + id + ")/users",
            method: "GET",
            asyn: true,
            crossDomain: true,
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {

                resolve(data.d.results)
            },
            error: function (data) {

            }
        });
    });
}
/*نمایش تمام یوزر ها شبیه lookup picker */
async function GetAllUsers() {

    var _Users = []
    var Users1 = await GetAllUsers1()
    for (let index = 0; index < Users1.length; index++) {
        _Users.push(Users1[index])
    }
    var Users2 = await GetAllUsers2()
    for (let index = 0; index < Users2.length; index++) {
        _Users.push(Users2[index])
    }

    var Users3 = await GetAllUsers3()
    for (let index = 0; index < Users3.length; index++) {
        _Users.push(Users3[index])
    }


    console.log(_Users.sort())

}
function GetAllUsers1() {
    return new Promise(resolve => {
        var _DetailsObjects = []
        var xx = "https://portal.golrang.com"
        var url = xx + "/_api/web/siteusers";
        $.getJSON(url)
            .then(function (data) {
                for (let index = 0; index < data.value.length; index++) {

                    var res = _DetailsObjects.find(x => x.LoginName == data.value[index].LoginName);
                    if (res == undefined)
                        _DetailsObjects.push({ Title: data.value[index].Title, LoginName: data.value[index].LoginName, Id: data.value[index].Id, Email: data.value[index].Email, SiteCollectionName: "Root" })
                }
                resolve(_DetailsObjects)
            });
    })
}
function GetAllUsers2() {
    return new Promise(resolve => {
        var _DetailsObjects = []
        xx = "https://portal.golrang.com/giglegal"
        var url = xx + "/_api/web/siteusers";
        $.getJSON(url)
            .then(function (data) {
                for (let index = 0; index < data.value.length; index++) {

                    var res = _DetailsObjects.find(x => x.LoginName == data.value[index].LoginName);
                    if (res == undefined)
                        _DetailsObjects.push({ Title: data.value[index].Title, LoginName: data.value[index].LoginName, Id: data.value[index].Id, Email: data.value[index].Email, SiteCollectionName: "Root" })
                }
                resolve(_DetailsObjects)
            });
    })
}
function GetAllUsers3() {
    return new Promise(resolve => {
        var _DetailsObjects = []
        xx = "https://portal.golrang.com/services"
        var url = xx + "/_api/web/siteusers";
        $.getJSON(url)
            .then(function (data) {
                for (let index = 0; index < data.value.length; index++) {

                    var res = _DetailsObjects.find(x => x.LoginName == data.value[index].LoginName);
                    if (res == undefined)
                        _DetailsObjects.push({ Title: data.value[index].Title, LoginName: data.value[index].LoginName, Id: data.value[index].Id, Email: data.value[index].Email, SiteCollectionName: "Root" })
                }
                resolve(_DetailsObjects)
            });
    })
}

