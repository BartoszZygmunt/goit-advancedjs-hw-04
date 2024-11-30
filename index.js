import{i as a,N as m,a as C,S as b}from"./assets/vendor-ugilJLq8.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();function I(t){const n=document.getElementById("images-container");t.forEach(r=>{const i=document.createElement("a");i.href=r.largeImageURL,i.classList.add("gallery-item");const e=document.createElement("div");e.className="gallery-item-wrapper",i.appendChild(e);const o=document.createElement("img");o.src=r.webformatURL,o.alt=r.tags||"Image",o.classList.add("gallery-image"),e.appendChild(o);const s=document.createElement("div");s.classList.add("gallery-item-info");const l=["Likes","Views","Comments","Downloads"],v=["likes","views","comments","downloads"];for(let c=0;c<4;c++){const d=document.createElement("div");d.classList.add("gallery-item-info-element");const f=document.createElement("span");f.textContent=l[c],f.classList.add("gallery-item-info-element-name");const g=document.createElement("span");g.textContent=r[v[c]],g.classList.add("gallery-item-info-element-value"),d.appendChild(f),d.appendChild(g),s.appendChild(d)}e.appendChild(s),n.appendChild(i)}),L(!0)}function w(t){t.response?t.response.status===401?a.error({title:"Unauthorized",message:"Invalid API key. Please check your credentials.",position:"topCenter"}):t.response.status===500?a.error({title:"Server Error",message:"Server is currently unavailable. Please try again later.",position:"topCenter"}):a.error({title:"Error",message:`An error occurred: ${t.response.statusText}`,position:"topCenter"}):t.request?a.error({title:"Network Error",message:"No response from server. Please check your internet connection.",position:"topCenter"}):a.error({title:"Error",message:`An error occurred while setting up the request: ${t.message}`,position:"topCenter"}),console.error("Error fetching images:",t)}m.configure({showSpinner:!0,trickleSpeed:500});async function y(t,n,r=!0){const i="https://pixabay.com/api/",e="21202878-7eed95eba93d8479640dfcfe2";m.start();try{const s=(await C.get(i,{params:{key:e,q:t,image_type:"photo",orientation:"horizontal",safeSearch:!0,per_page:15,page:n}})).data;if(s.total===0){a.error({title:"Error",message:"No images found. Try another query.",position:"topCenter"});return}const l=document.getElementById("images-container");if(!l){a.error({title:"Error",message:"Images container not found in the document.",position:"topCenter"}),m.done();return}r&&(l.innerHTML=""),I(s.hits),P(),E.refresh()}catch(o){w(o)}finally{m.done()}}const P=()=>{window.scrollTo({top:document.body.scrollHeight,left:0,behavior:"smooth"})};let p=1,u="",E;function S(){E=new b("#images-container a",{captions:!0,captionsData:"alt",captionDelay:250})}S();const h=document.querySelector("form");h.addEventListener("submit",t=>{if(t.preventDefault(),u=h.querySelector("input").value.trim(),u===""){a.error({title:"Error",message:"Please fill out the form field.",position:"topCenter",timeout:2e3}),L(!1),x();return}p=1,y(u,p),h.querySelector("input").value=""});function L(t){const n=document.querySelector("#load-more"),r=document.querySelector("#to-top");t===!0?(n.classList.remove("hidden"),r.classList.remove("hidden")):(n.classList.add("hidden"),r.classList.add("hidden"))}const q=document.getElementById("load-more");q.addEventListener("click",()=>{p+=1,y(u,p,!1)});const x=()=>{console.log("clearing gallery111");const t=document.getElementById("images-container");t&&(console.log("clearing gallery"),t.innerHTML="")},A=()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})},N=document.getElementById("to-top");N.addEventListener("click",()=>{A()});
//# sourceMappingURL=index.js.map
