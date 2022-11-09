import fetch from 'node-fetch';
import fs from 'fs';

var authorization = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InJRdmlDaV9yalVRc3lQVWhPRUxHaHpuU0F3aDFnb3NlY1lHOHVwVEUzbU0ifQ.eyJqdGkiOiI2YWJlMjRiMC1mNDVkLTQ1MmMtYTgyMS0yMTdmYmM3ZmZjMGYiLCJzdWIiOiJ3d3cuancub3JnLXB1YmxpYyIsImlzcyI6Imp3b3JnOmF1dGg6cHJkIiwiaWF0IjoxNjYwMDUzNjI5LCJuYmYiOjE2NjAwNTM2MjksImV4cCI6MTY2MDY1ODQyOSwiYXVkIjpbIk11bHRpU2l0ZVNlYXJjaDpwcmQiLCJKV0JNZWRpYXRvcjpwcmQiLCJBbGVydHM6cHJkIiwiT21uaVNlYXJjaDpwcmQiXSwicGVybXMiOnsib21uaS1zZWFyY2giOnsic2l0ZXMiOlsiancub3JnOnByZCIsIndvbDpwcmQiXSwiZmlsdGVycyI6WyJhbGwiLCJwdWJsaWNhdGlvbnMiLCJ2aWRlb3MiLCJhdWRpbyIsImJpYmxlIiwiaW5kZXhlcyJdLCJ0YWdzIjp7ImV4Y2x1ZGVkIjpbIlNlYXJjaEV4Y2x1ZGUiLCJXV1dFeGNsdWRlIl19fSwic2VhcmNoIjp7ImZhY2V0cyI6W3sibmFtZSI6InR5cGUiLCJmaWVsZCI6InRhZ3MiLCJ2YWx1ZXMiOlsidHlwZTp2aWRlbyJdfV19fX0.effcIfh8VH2_iz_Z_flEhnM9epNUpnATAAOOW1XiudrB0wU_QuXpE8apQPVkGNeyMB1vdZchCeJyHtmlLAIRjrNBBritJF1uP0jcYQVEGCtLXLy4oLQbJqE5wyYC87aSMrh8gJRTm4VhNVndOGj8cyaCKWXPLLBlkVJgVXIVryYy33EKNjCa6hjERODchBJ_D-mQWO9c868mmBjrk36WxQLWBs_JzklXbYIlzq1p-4d_Ov7qUSP3Gni6I8_sn92acynfpzSgl66wmll-jOWuktTZIHeREAYZdyE8xafYQtVVMDP7hO3UtJczDyXApgBXWvE5SqBRphHu1LvGRd85sA";

var foundVideos = {};

async function getCategory(categoryName){
    console.log(`getSubCategories(${categoryName})`);
    return await fetch("https://b.jw-cdn.org/apis/mediator/v1/categories/E/" + categoryName + "?detailed=1&clientType=www", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "authorization": authorization,
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "Referer": "https://www.jw.org/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    }).then((response) => response.json()).then((data) => data.category);//.then((data) => data.category.subcategories.map(ele => ele.key))
}
async function getVideosInCategory(categoryName){
    //.then((data) => { console.log(data); if (data.category.media) return data.category.media; return data.category. })
}
async function GetVideos(categoryName, categoryPath){
    return getCategory(categoryName).then(async (category) => {
        if (category.media){
            foundVideos[categoryPath + categoryName] = category.media;
            fs.writeFile("./VOD/" + (categoryPath + categoryName) + ".json", JSON.stringify(category.media, null, 4), (err) => {
                if (err) { console.error(err); return; };
                console.log("File has been created");
            });
        }
        if (category.subcategories){
            if (categoryName != "VideoOnDemand")
                categoryPath += categoryName + "-";
            for (const subCategoryName of category.subcategories.map(ele => ele.key)) {
                if (subCategoryName.includes("Featured")) continue;
                await GetVideos(subCategoryName, categoryPath)
            }
        }
    });
}
GetVideos("VideoOnDemand", "").then((data)=>{
    fs.writeFile("./VOD/All.json", JSON.stringify(foundVideos, null, 4), (err) => {
        if (err) { console.error(err); return; };
        console.log("File has been created");
    });
});