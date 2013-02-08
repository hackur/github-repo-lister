/*
 * File:        ColReorder.js
 * Version:     1.0.6
 * CVS:         $Id$
 * Description: Controls for column visiblity in DataTables
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Created:     Wed Sep 15 18:23:29 BST 2010
 * Modified:    $Date$ by $Author$
 * Language:    Javascript
 * License:     GPL v2 or BSD 3 point style
 * Project:     DataTables
 * Contact:     www.sprymedia.co.uk/contact
 *
 * Copyright 2010-2011 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 *
 */
(function(e,t,n){function r(e){var t=[];for(var n=0,r=e.length;n<r;n++)t[e[n]]=n;return t}function i(e,t,n){var r=e.splice(t,1)[0];e.splice(n,0,r)}function s(e,t,n){var r=[];for(var i=0,s=e.childNodes.length;i<s;i++)e.childNodes[i].nodeType==1&&r.push(e.childNodes[i]);var o=r[t];n!==null?e.insertBefore(o,r[n]):e.appendChild(o)}e.fn.dataTableExt.oApi.fnColReorder=function(t,n,o){var u,a,f,l,c=t.aoColumns.length,h,p;if(n==o)return;if(n<0||n>=c){this.oApi._fnLog(t,1,"ColReorder 'from' index is out of bounds: "+n);return}if(o<0||o>=c){this.oApi._fnLog(t,1,"ColReorder 'to' index is out of bounds: "+o);return}var d=[];for(u=0,a=c;u<a;u++)d[u]=u;i(d,n,o);var v=r(d);for(u=0,a=t.aaSorting.length;u<a;u++)t.aaSorting[u][0]=v[t.aaSorting[u][0]];if(t.aaSortingFixed!==null)for(u=0,a=t.aaSortingFixed.length;u<a;u++)t.aaSortingFixed[u][0]=v[t.aaSortingFixed[u][0]];for(u=0,a=c;u<a;u++){p=t.aoColumns[u];for(f=0,l=p.aDataSort.length;f<l;f++)p.aDataSort[f]=v[p.aDataSort[f]]}for(u=0,a=c;u<a;u++)p=t.aoColumns[u],typeof p.mDataProp=="number"&&(p.mDataProp=v[p.mDataProp],p.fnGetData=t.oApi._fnGetObjectDataFn(p.mDataProp),p.fnSetData=t.oApi._fnSetObjectDataFn(p.mDataProp));if(t.aoColumns[n].bVisible){var m=this.oApi._fnColumnIndexToVisible(t,n),g=null;u=o<n?o:o+1;while(g===null&&u<c)g=this.oApi._fnColumnIndexToVisible(t,u),u++;h=t.nTHead.getElementsByTagName("tr");for(u=0,a=h.length;u<a;u++)s(h[u],m,g);if(t.nTFoot!==null){h=t.nTFoot.getElementsByTagName("tr");for(u=0,a=h.length;u<a;u++)s(h[u],m,g)}for(u=0,a=t.aoData.length;u<a;u++)t.aoData[u].nTr!==null&&s(t.aoData[u].nTr,m,g)}i(t.aoColumns,n,o),i(t.aoPreSearchCols,n,o);for(u=0,a=t.aoData.length;u<a;u++)e.isArray(t.aoData[u]._aData)&&i(t.aoData[u]._aData,n,o),i(t.aoData[u]._anHidden,n,o);for(u=0,a=t.aoHeader.length;u<a;u++)i(t.aoHeader[u],n,o);if(t.aoFooter!==null)for(u=0,a=t.aoFooter.length;u<a;u++)i(t.aoFooter[u],n,o);for(u=0,a=c;u<a;u++)e(t.aoColumns[u].nTh).unbind("click"),this.oApi._fnSortAttachListener(t,t.aoColumns[u].nTh,u);e(t.oInstance).trigger("column-reorder",[t,{iFrom:n,iTo:o,aiInvertMapping:v}]),typeof t.oInstance._oPluginFixedHeader!="undefined"&&t.oInstance._oPluginFixedHeader.fnUpdate()},ColReorder=function(e,t){return(!this.CLASS||this.CLASS!="ColReorder")&&alert("Warning: ColReorder must be initialised with the keyword 'new'"),typeof t=="undefined"&&(t={}),this.s={dt:null,init:t,fixed:0,dropCallback:null,mouse:{startX:-1,startY:-1,offsetX:-1,offsetY:-1,target:-1,targetIndex:-1,fromIndex:-1},aoTargets:[]},this.dom={drag:null,pointer:null},this.s.dt=e.fnSettings(),this._fnConstruct(),ColReorder.aoInstances.push(this),this},ColReorder.prototype={fnReset:function(){var e=[];for(var t=0,n=this.s.dt.aoColumns.length;t<n;t++)e.push(this.s.dt.aoColumns[t]._ColReorder_iOrigCol);this._fnOrderColumns(e)},_fnConstruct:function(){var e=this,t,n;typeof this.s.init.iFixedColumns!="undefined"&&(this.s.fixed=this.s.init.iFixedColumns),typeof this.s.init.fnReorderCallback!="undefined"&&(this.s.dropCallback=this.s.init.fnReorderCallback);for(t=0,n=this.s.dt.aoColumns.length;t<n;t++)t>this.s.fixed-1&&this._fnMouseListener(t,this.s.dt.aoColumns[t].nTh),this.s.dt.aoColumns[t]._ColReorder_iOrigCol=t;this.s.dt.oApi._fnCallbackReg(this.s.dt,"aoStateSaveParams",function(t,n){e._fnStateSave.call(e,n)},"ColReorder_State");var i=null;typeof this.s.init.aiOrder!="undefined"&&(i=this.s.init.aiOrder.slice()),this.s.dt.oLoadedState&&typeof this.s.dt.oLoadedState.ColReorder!="undefined"&&this.s.dt.oLoadedState.ColReorder.length==this.s.dt.aoColumns.length&&(i=this.s.dt.oLoadedState.ColReorder);if(i)if(!e.s.dt._bInitComplete){var s=!1;this.s.dt.aoDrawCallback.push({fn:function(){if(!e.s.dt._bInitComplete&&!s){s=!0;var t=r(i);e._fnOrderColumns.call(e,t)}},sName:"ColReorder_Pre"})}else{var o=r(i);e._fnOrderColumns.call(e,o)}},_fnOrderColumns:function(t){if(t.length!=this.s.dt.aoColumns.length){this.s.dt.oInstance.oApi._fnLog(this.s.dt,1,"ColReorder - array reorder does not match known number of columns. Skipping.");return}for(var n=0,r=t.length;n<r;n++){var s=e.inArray(n,t);n!=s&&(i(t,s,n),this.s.dt.oInstance.fnColReorder(s,n))}(this.s.dt.oScroll.sX!==""||this.s.dt.oScroll.sY!=="")&&this.s.dt.oInstance.fnAdjustColumnSizing(),this.s.dt.oInstance.oApi._fnSaveState(this.s.dt)},_fnStateSave:function(t){var n,r,i,s,o=this.s.dt;for(n=0;n<t.aaSorting.length;n++)t.aaSorting[n][0]=o.aoColumns[t.aaSorting[n][0]]._ColReorder_iOrigCol;aSearchCopy=e.extend(!0,[],t.aoSearchCols),t.ColReorder=[];for(n=0,r=o.aoColumns.length;n<r;n++)s=o.aoColumns[n]._ColReorder_iOrigCol,t.aoSearchCols[s]=aSearchCopy[n],t.abVisCols[s]=o.aoColumns[n].bVisible,t.ColReorder.push(s)},_fnMouseListener:function(t,n){var r=this;e(n).bind("mousedown.ColReorder",function(e){e.preventDefault(),r._fnMouseDown.call(r,e,n)})},_fnMouseDown:function(t,r){var i=this,s=this.s.dt.aoColumns,o=t.target.nodeName=="TH"?t.target:e(t.target).parents("TH")[0],u=e(o).offset();this.s.mouse.startX=t.pageX,this.s.mouse.startY=t.pageY,this.s.mouse.offsetX=t.pageX-u.left,this.s.mouse.offsetY=t.pageY-u.top,this.s.mouse.target=r,this.s.mouse.targetIndex=e("th",r.parentNode).index(r),this.s.mouse.fromIndex=this.s.dt.oInstance.oApi._fnVisibleToColumnIndex(this.s.dt,this.s.mouse.targetIndex),this.s.aoTargets.splice(0,this.s.aoTargets.length),this.s.aoTargets.push({x:e(this.s.dt.nTable).offset().left,to:0});var a=0;for(var f=0,l=s.length;f<l;f++)f!=this.s.mouse.fromIndex&&a++,s[f].bVisible&&this.s.aoTargets.push({x:e(s[f].nTh).offset().left+e(s[f].nTh).outerWidth(),to:a});this.s.fixed!==0&&this.s.aoTargets.splice(0,this.s.fixed),e(n).bind("mousemove.ColReorder",function(e){i._fnMouseMove.call(i,e)}),e(n).bind("mouseup.ColReorder",function(e){i._fnMouseUp.call(i,e)})},_fnMouseMove:function(e){var t=this;if(this.dom.drag===null){if(Math.pow(Math.pow(e.pageX-this.s.mouse.startX,2)+Math.pow(e.pageY-this.s.mouse.startY,2),.5)<5)return;this._fnCreateDragNode()}this.dom.drag.style.left=e.pageX-this.s.mouse.offsetX+"px",this.dom.drag.style.top=e.pageY-this.s.mouse.offsetY+"px";var n=!1;for(var r=1,i=this.s.aoTargets.length;r<i;r++)if(e.pageX<this.s.aoTargets[r-1].x+(this.s.aoTargets[r].x-this.s.aoTargets[r-1].x)/2){this.dom.pointer.style.left=this.s.aoTargets[r-1].x+"px",this.s.mouse.toIndex=this.s.aoTargets[r-1].to,n=!0;break}n||(this.dom.pointer.style.left=this.s.aoTargets[this.s.aoTargets.length-1].x+"px",this.s.mouse.toIndex=this.s.aoTargets[this.s.aoTargets.length-1].to)},_fnMouseUp:function(t){var r=this;e(n).unbind("mousemove.ColReorder"),e(n).unbind("mouseup.ColReorder"),this.dom.drag!==null&&(n.body.removeChild(this.dom.drag),n.body.removeChild(this.dom.pointer),this.dom.drag=null,this.dom.pointer=null,this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex,this.s.mouse.toIndex),(this.s.dt.oScroll.sX!==""||this.s.dt.oScroll.sY!=="")&&this.s.dt.oInstance.fnAdjustColumnSizing(),this.s.dropCallback!==null&&this.s.dropCallback.call(this),this.s.dt.oInstance.oApi._fnSaveState(this.s.dt))},_fnCreateDragNode:function(){var t=this;this.dom.drag=e(this.s.dt.nTHead.parentNode).clone(!0)[0],this.dom.drag.className+=" DTCR_clonedTable";while(this.dom.drag.getElementsByTagName("caption").length>0)this.dom.drag.removeChild(this.dom.drag.getElementsByTagName("caption")[0]);while(this.dom.drag.getElementsByTagName("tbody").length>0)this.dom.drag.removeChild(this.dom.drag.getElementsByTagName("tbody")[0]);while(this.dom.drag.getElementsByTagName("tfoot").length>0)this.dom.drag.removeChild(this.dom.drag.getElementsByTagName("tfoot")[0]);e("thead tr:eq(0)",this.dom.drag).each(function(){e("th:not(:eq("+t.s.mouse.targetIndex+"))",this).remove()}),e("tr",this.dom.drag).height(e("tr:eq(0)",t.s.dt.nTHead).height()),e("thead tr:gt(0)",this.dom.drag).remove(),e("thead th:eq(0)",this.dom.drag).each(function(n){this.style.width=e("th:eq("+t.s.mouse.targetIndex+")",t.s.dt.nTHead).width()+"px"}),this.dom.drag.style.position="absolute",this.dom.drag.style.top="0px",this.dom.drag.style.left="0px",this.dom.drag.style.width=e("th:eq("+t.s.mouse.targetIndex+")",t.s.dt.nTHead).outerWidth()+"px",this.dom.pointer=n.createElement("div"),this.dom.pointer.className="DTCR_pointer",this.dom.pointer.style.position="absolute",this.s.dt.oScroll.sX===""&&this.s.dt.oScroll.sY===""?(this.dom.pointer.style.top=e(this.s.dt.nTable).offset().top+"px",this.dom.pointer.style.height=e(this.s.dt.nTable).height()+"px"):(this.dom.pointer.style.top=e("div.dataTables_scroll",this.s.dt.nTableWrapper).offset().top+"px",this.dom.pointer.style.height=e("div.dataTables_scroll",this.s.dt.nTableWrapper).height()+"px"),n.body.appendChild(this.dom.pointer),n.body.appendChild(this.dom.drag)}},ColReorder.aoInstances=[],ColReorder.fnReset=function(e){for(var t=0,n=ColReorder.aoInstances.length;t<n;t++)ColReorder.aoInstances[t].s.dt.oInstance==e&&ColReorder.aoInstances[t].fnReset()},ColReorder.prototype.CLASS="ColReorder",ColReorder.VERSION="1.0.6",ColReorder.prototype.VERSION=ColReorder.VERSION,typeof e.fn.dataTable=="function"&&typeof e.fn.dataTableExt.fnVersionCheck=="function"&&e.fn.dataTableExt.fnVersionCheck("1.9.0")?e.fn.dataTableExt.aoFeatures.push({fnInit:function(e){var t=e.oInstance;if(typeof t._oPluginColReorder=="undefined"){var n=typeof e.oInit.oColReorder!="undefined"?e.oInit.oColReorder:{};t._oPluginColReorder=new ColReorder(e.oInstance,n)}else t.oApi._fnLog(e,1,"ColReorder attempted to initialise twice. Ignoring second");return null},cFeature:"R",sFeature:"ColReorder"}):alert("Warning: ColReorder requires DataTables 1.9.0 or greater - www.datatables.net/download")})(jQuery,window,document);