(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b56b67ae"],{"0b42":function(t,e,a){var i=a("da84"),n=a("e8b5"),o=a("68ee"),r=a("861d"),l=a("b622"),s=l("species"),c=i.Array;t.exports=function(t){var e;return n(t)&&(e=t.constructor,o(e)&&(e===c||n(e.prototype))?e=void 0:r(e)&&(e=e[s],null===e&&(e=void 0))),void 0===e?c:e}},"1dde":function(t,e,a){var i=a("d039"),n=a("b622"),o=a("2d00"),r=n("species");t.exports=function(t){return o>=51||!i((function(){var e=[],a=e.constructor={};return a[r]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"65f0":function(t,e,a){var i=a("0b42");t.exports=function(t,e){return new(i(t))(0===e?0:e)}},8418:function(t,e,a){"use strict";var i=a("a04b"),n=a("9bf2"),o=a("5c6c");t.exports=function(t,e,a){var r=i(e);r in t?n.f(t,r,o(0,a)):t[r]=a}},"99af":function(t,e,a){"use strict";var i=a("23e7"),n=a("da84"),o=a("d039"),r=a("e8b5"),l=a("861d"),s=a("7b0b"),c=a("07fa"),u=a("8418"),d=a("65f0"),f=a("1dde"),p=a("b622"),h=a("2d00"),m=p("isConcatSpreadable"),b=9007199254740991,v="Maximum allowed index exceeded",g=n.TypeError,w=h>=51||!o((function(){var t=[];return t[m]=!1,t.concat()[0]!==t})),y=f("concat"),S=function(t){if(!l(t))return!1;var e=t[m];return void 0!==e?!!e:r(t)},x=!w||!y;i({target:"Array",proto:!0,forced:x},{concat:function(t){var e,a,i,n,o,r=s(this),l=d(r,0),f=0;for(e=-1,i=arguments.length;e<i;e++)if(o=-1===e?r:arguments[e],S(o)){if(n=c(o),f+n>b)throw g(v);for(a=0;a<n;a++,f++)a in o&&u(l,f,o[a])}else{if(f>=b)throw g(v);u(l,f++,o)}return l.length=f,l}})},a1f4:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{width:"98%","margin-left":"2%","text-align":"center","margin-top":"10px"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{label:"Product imag",width:"180"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{attrs:{src:t.row.imgUrl,width:"150px",height:"150px",alt:""}})]}}])}),a("el-table-column",{attrs:{prop:"coname",label:"Product",width:"180"}}),a("el-table-column",{attrs:{prop:"jhtitle",label:"Title",width:"200"}}),a("el-table-column",{attrs:{prop:"price",label:"price",sortable:"",width:"150"}}),a("el-table-column",{attrs:{prop:"conumber",label:"Volume",sortable:"",width:"150"}}),a("el-table-column",{attrs:{label:"Status",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.code?a("span",[t._v("On sale")]):a("span",[t._v("off sale")])]}}])}),a("el-table-column",{attrs:{label:"Operation",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.update(e.row)}}},[t._v("modify")]),0==e.row.code?a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.deleted(e.row,1)}}},[t._v("off sale")]):a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.deleted(e.row,0)}}},[t._v("on sale")])]}}])})],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isPage,expression:"isPage"}],staticStyle:{"margin-top":"20px"}},[a("el-pagination",{attrs:{"page-size":t.pagesize,"current-page":t.currPage,background:"",layout:"prev, pager, next",total:t.total},on:{"current-change":t.currPageChange}}),a("br"),a("br")],1),a("updateCommodity",{directives:[{name:"show",rawName:"v-show",value:t.updateIsShow,expression:"updateIsShow"}],ref:"update"}),a("deleteCommodity",{directives:[{name:"show",rawName:"v-show",value:t.delIsShow,expression:"delIsShow"}],ref:"del"})],1)},n=[],o=(a("99af"),a("4ec3")),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{title:"Modify item","before-close":t.handleClose,visible:t.isShow,width:"50%"},on:{"update:visible":function(e){t.isShow=e}}},[a("div",[a("el-form",{ref:"form",attrs:{model:t.data,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"item id"}},[a("el-input",{attrs:{disabled:""},model:{value:t.data.coid,callback:function(e){t.$set(t.data,"coid",e)},expression:"data.coid"}})],1),a("el-form-item",{attrs:{label:"item name"}},[a("el-input",{model:{value:t.data.coname,callback:function(e){t.$set(t.data,"coname",e)},expression:"data.coname"}})],1),a("el-form-item",{attrs:{label:"item title"}},[a("el-input",{attrs:{type:"textarea",autosize:""},model:{value:t.data.title,callback:function(e){t.$set(t.data,"title",e)},expression:"data.title"}})],1),a("el-form-item",{attrs:{label:"item price"}},[a("el-input",{attrs:{type:"number"},model:{value:t.data.price,callback:function(e){t.$set(t.data,"price",t._n(e))},expression:"data.price"}})],1),a("el-form-item",{attrs:{label:"volume"}},[a("el-input",{attrs:{disabled:""},model:{value:t.data.conumber,callback:function(e){t.$set(t.data,"conumber",e)},expression:"data.conumber"}})],1)],1),a("el-button",{on:{click:t.update}},[t._v("Modify")])],1)])],1)},l=[],s={data:function(){return{isShow:!1,data:{coid:null,coname:null,price:null,title:null,jhtitle:null,productDescription:null,imgUrl:null,conumber:null}}},methods:{init:function(t){this.data=t,this.isShow=!0},handleClose:function(t){var e=this;this.$confirm("Confirm to close?").then((function(a){t(),e.$emit("update")})).catch((function(t){}))},update:function(){var t=this;if(""!=this.data.coname)if(""!=this.data.title)if(""!=this.data.price){if(this.data.title.length>50){var e=this.data.title.substring(0,50)+"...";this.data.jhtitle=e}else this.data.jhtitle=this.title;Object(o["a"])("/api/updateCommodity","post",this.data).then((function(e){200==e.code&&(t.$message("Successfully modified"),t.isShow=!1)}))}else this.$message.error("Product price cannot be empty");else this.$message.error("Product title cannot be empty");else this.$message.error("Product name cannot be empty")}}},c=s,u=a("2877"),d=Object(u["a"])(c,r,l,!1,null,null,null),f=d.exports,p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{title:"put on/off sale",visible:t.isShow,width:"30%"},on:{"update:visible":function(e){t.isShow=e}}},[0==t.code?a("span",[t._v(" if on sale ")]):a("span",[t._v(" if off sale ")]),a("div",{staticStyle:{"margin-top":"50px"}},[a("el-button",{on:{click:function(e){t.isShow=!1}}},[t._v("Cancel")]),a("el-button",{attrs:{type:"primary"},on:{click:t.btn}},[t._v("Confirm")])],1)])],1)},h=[],m={data:function(){return{isShow:!1,code:0,data:null}},methods:{init:function(t,e){this.isShow=!0,this.data=t,this.code=e},btn:function(){var t=this;this.data.code=this.code,Object(o["a"])("/api/updateCommodity","post",this.data).then((function(e){200==e.code&&(t.$message("Succeed"),t.isShow=!1)}))}}},b=m,v=Object(u["a"])(b,p,h,!1,null,null,null),g=v.exports,w={components:{updateCommodity:f,deleteCommodity:g},data:function(){return{tableData:[],pagesize:5,currPage:1,updateIsShow:!1,delIsShow:!1,isPage:!1,total:0}},mounted:function(){this.getData(this.currPage,this.pagesize)},beforeRouteEnter:function(t,e,a){console.log("Enter"),null==sessionStorage.getItem("admin")&&router.push("/home"),document.title="Mall backend",a()},methods:{update:function(t){var e=this;this.$refs.update.init(t),this.updateIsShow=!0,this.$refs.update.$on("update",(function(){e.getData(e.currPage,e.pagesize)}))},deleted:function(t,e){this.$refs.del.init(t,e),this.delIsShow=!0},currPageChange:function(t){this.currPage=t,this.getData(t,this.pagesize)},getData:function(t,e){var a=this;Object(o["a"])("/api/commodity/".concat(t,"/").concat(e),"get").then((function(t){200==t.code&&(a.tableData=t.data,t.total>a.pagesize?(a.isPage=!0,a.total=t.total):a.isPage=!1)}))}}},y=w,S=Object(u["a"])(y,i,n,!1,null,null,null);e["default"]=S.exports},e8b5:function(t,e,a){var i=a("c6b6");t.exports=Array.isArray||function(t){return"Array"==i(t)}}}]);
//# sourceMappingURL=chunk-b56b67ae.6fa6dedb.js.map