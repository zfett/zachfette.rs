---
---
/*
 * email-copy.js - Finds all .email-copy elements and allows them to be copied.
 * Created by Zachary Fetters on Sep. 19th, 2022. Available under the MIT license.
 */

const allowEmailCopy = {{ site.allowEmailCopy }};
const emailLinks = document.querySelectorAll("a.email-copy");
let setLinkElem = 0;

const copyEmail = (i, e) => {
    var txt = new DOMParser().parseFromString(`${atob(emailLinks[i].getAttribute("data-email-prefix"))}@${atob(emailLinks[i].getAttribute("data-email-suffix"))}`, 'text/html');
    navigator.clipboard.writeText(txt.body.textContent).then(() => {
        window.alert("Copied email address!");
        return true;
    }, () => {
        console.error("Couldn't copy text: ", err);
        return false;
    });
}

if (allowEmailCopy && emailLinks.length !== 0) {
    console.debug(`Found ${emailLinks.length} email link(s) on page`);

    for ([idx,elem] of emailLinks.entries()) {
        elem.setAttribute("onclick", `copyEmail(${idx}, this)`);
        setLinkElem++;
    }

    if (setLinkElem == emailLinks.length) {
        console.debug(`Success! Created ${setLinkElem} of ${emailLinks.length} email links`);
    } else {
        console.warn(`Created ${setLinkElem} of ${emailLinks.length} email links`);
    }
} else if (!allowEmailCopy) {
    console.warn("Email address copying is not allowed on this site. If you're the site admin and want to enable this feature, change the 'allowEmailCopy' variable in your site's '_config.yml' file to 'true'.");
} else if (emailLinks.length == 0) {
    console.error("Couldn't find any email links on this page");
} else {
    console.error("An unknown error is preventing the generation of email links");
}
