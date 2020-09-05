import { Key } from '@/config'
export function TMap() {
     return new Promise(function (resolve, reject) {
          window.init = function () {
               resolve(qq)//注意这里
          }
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "http://map.qq.com/api/js?v=2.exp&callback=init&key=" + Key;
          script.onerror = reject;
          document.head.appendChild(script);
     })
}