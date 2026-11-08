var e=`emdash:html-block-frame`,t=2e4;function n(e){let{html:t,css:n,js:r,isolated:i}=e,a={html:typeof t==`string`?t:``};return typeof n==`string`&&n&&(a.css=n),typeof r==`string`&&r&&(a.js=r),i===!0&&(a.isolated=!0),a}var r=`address.article.aside.footer.header.h1.h2.h3.h4.h5.h6.hgroup.main.nav.section.blockquote.dd.div.dl.dt.figcaption.figure.hr.li.menu.ol.p.pre.ul.a.abbr.b.bdi.bdo.br.cite.code.data.dfn.em.i.kbd.mark.q.rb.rp.rt.rtc.ruby.s.samp.small.span.strong.sub.sup.time.u.var.wbr.caption.col.colgroup.table.tbody.td.tfoot.th.thead.tr.img.iframe`.split(`.`),i={"*":[`class`,`id`,`data-*`],a:[`href`,`name`,`target`],img:[`src`,`srcset`,`alt`,`title`,`width`,`height`,`loading`],iframe:[`src`,`width`,`height`,`frameborder`,`allow`,`allowfullscreen`]},a=[`http`,`https`,`ftp`,`mailto`,`tel`],o=[`www.youtube.com`,`player.vimeo.com`],s=`body{margin:0;font-family:system-ui,sans-serif;line-height:1.5}`,c=`<base href="/" target="_top">`,l=`(() => {
	const type = ${JSON.stringify(e)};
	const root = document.documentElement;
	const report = () => {
		const overflow = root.scrollHeight > root.clientHeight ? root.scrollHeight : 0;
		const height = Math.max(root.getBoundingClientRect().height, overflow);
		parent.postMessage({ type, height: Math.ceil(height + innerHeight - root.clientHeight) }, "*");
	};
	const observer = new ResizeObserver(report);
	observer.observe(root);
	addEventListener("DOMContentLoaded", () => observer.observe(document.body));
	addEventListener("message", (event) => {
		if (event.source === parent && event.data?.type === type) report();
	});
	addEventListener(
		"securitypolicyviolation",
		() => parent.postMessage({ type, blocked: true }, "*"),
		{ once: true },
	);
})();`,u=/<\/(style)/gi,d=/<(?=\/?script[\t\n\f\r />])/gi;function f({html:e,css:t=``,js:n=``}){return`<!doctype html><html><head><meta charset="utf-8">${c}<style>${s}</style><script>${l}<\/script>${t.trim()?`<style>${t.replace(u,`<\\/$1`)}</style>`:``}</head><body>${e}${n.trim()?`<script>${n.replace(d,`\\x3c`)}<\/script>`:``}</body></html>`}export{r as a,n as c,a as i,e as n,o,i as r,f as s,t};