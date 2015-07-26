!function(app){app.factory("SemanticUI",function(){return{bindAttribute:function(scope,variable,element,attribute){scope.$watch(variable,function(updated){element.attr(attribute,updated)})},onEvent:function(settings,evt,func){settings[evt]=function(existing){return function(){angular.isFunction(existing)&&existing.apply(this,arguments),func.apply(this,arguments)}}(settings[evt])},linkEvents:function(scope,settings,linkings){for(var evt in linkings){var scopeVariable=linkings[evt];this.onEvent(settings,evt,function(){var scopeValue=scope[scopeVariable];angular.isFunction(scopeValue)&&scopeValue.apply(this,arguments)})}},createBind:function(attribute,module){var helper=this,scope={};return scope[attribute]="=",{restrict:"A",scope:scope,link:function(scope,element,attributes){helper.initBind(scope,attribute,element,module)}}},initBind:function(scope,attribute,element,module){element.ready(function(){element[module](scope[attribute])})},createBehavior:function(attribute,module,method){var helper=this,scope={};return scope[attribute]="=",{restrict:"A",scope:scope,link:function(scope,element,attributes){helper.initBehavior(scope,attribute,element,module,method)}}},initBehavior:function(scope,attribute,element,module,method){var settings={$:void 0,evt:"click",enabled:!0,value:void 0},input=scope[attribute];angular.isString(input)?settings.$=input:angular.isObject(input)&&(angular.isString(input.evt)||(input.evt=settings.evt),angular.isDefined(input.enabled)||(input.enabled=settings.enabled),settings=input);var onEvent=function(){settings.enabled&&$(settings.$)[module](method,settings.value)};element.ready(function(){element.on(settings.evt,onEvent)})},async:function(scope,func){return function(){var context=this,args=Array.prototype.slice.call(arguments);scope.$evalAsync(function(){func.apply(context,args)})}},watcher:function(scope,expression,func,context){var ignoreUpdate=!1;return scope.$watch(expression,function(updated){ignoreUpdate||func.call(context,updated),ignoreUpdate=!1}),{set:function(value){scope[expression]!=value&&scope.$evalAsync(function(){scope[expression]=value,ignoreUpdate=!0})}}}}})}(angular.module("semantic-ui",[])),function(app){app.directive("smHtml",function(){return{restrict:"A",transclude:!0,link:function(scope,element,attributes){scope.$watch(attributes.smHtml,function(value){element.html(value)})}}}),app.directive("smButton",function(){return{restrict:"E",replace:!0,transclude:!0,template:'<button class="ui button" ng-transclude></button>'}}),app.directive("smMenuItem",function(){return{restrict:"E",replace:!0,transclude:!0,scope:{icon:"@"},template:'<a class="item"><i class="{{ icon }} icon" ng-if="icon"></i><span ng-transclude></span></a>'}}),app.directive("smAttrs",function(){return{restrict:"A",scope:{smAttrs:"="},link:function(scope,element,attributes){angular.forEach(scope.smAttrs,function(val,key){(angular.isNumber(val)||angular.isString(val))&&element.attr(key,val)})}}}),app.directive("smLiveAttrs",function(){return{restrict:"A",scope:{smLiveAttrs:"="},link:function(scope,element,attributes){var expression=function(){return scope.smLiveAttrs},setter=function(){angular.forEach(scope.smLiveAttrs,function(val,key){(angular.isNumber(val)||angular.isString(val))&&element.attr(key,val)})};scope.$watch(expression,setter,!0)}}}),app.directive("smData",function(){return{restrict:"A",scope:{smData:"="},link:function(scope,element,attributes){element.data(scope.smData)}}}),app.directive("smLiveData",function(){return{restrict:"A",scope:{smData:"="},link:function(scope,element,attributes){var expression=function(){return scope.smData},setter=function(){element.data(scope.smData)};scope.$watch(expression,setter,!0)}}}),app.directive("smFlatMenu",function(){return{restrict:"E",replace:!0,template:['<div class="menu">','  <div class="item" ng-repeat="item in items" data-value="{{ getValue(item) }}" sm-html="label({item:item})"></div>',"</div>"].join("\n")}})}(angular.module("semantic-ui")),function(app){app.directive("smAccordionBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smAccordionBind","accordion")}]);var BEHAVIORS={smAccordionOpen:"open",smAccordionCloseOthers:"close others",smAccordionClose:"close",smAccordionToggle:"toggle"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"accordion",method)}])}),app.directive("smAccordion",["SemanticUI",function(SemanticUI){return{restrict:"E",replace:!0,transclude:!0,scope:{settings:"=",onInit:"=",onOpening:"=",onOpen:"=",onClosing:"=",onClose:"=",onChange:"="},template:'<div class="ui accordion" ng-transclude></div>',link:function(scope,element,attributes){element.ready(function(){var settings=scope.settings||{};SemanticUI.linkEvents(scope,settings,{onOpening:"onOpening",onOpen:"onOpen",onClosing:"onClosing",onClose:"onClose",onChange:"onChange"}),element.accordion(settings),angular.isFunction(scope.onInit)&&scope.onInit(element)})}}}]),app.directive("smAccordionGroup",function(){return{restrict:"E",required:"title",transclude:!0,scope:{title:"=",active:"="},template:['<div class="title" ng-class="{active: active}">','  <i class="dropdown icon"></i>',"  {{ title }}","</div>",'<div class="content" ng-class="{active: active}" ng-transclude>',"</div>"].join("\n")}})}(angular.module("semantic-ui")),function(app){app.directive("smCheckboxBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smCheckboxBind","checkbox")}]);var BEHAVIORS={smCheckboxToggle:"toggle",smCheckboxCheck:"check",smCheckboxUncheck:"uncheck",smCheckboxIndeterminate:"indeterminate",smCheckboxDeterminate:"determinate",smCheckboxEnable:"enable",smCheckboxDisable:"disable"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"checkbox",method)}])}),app.directive("smCheckbox",["SemanticUI",function(SemanticUI){return{restrict:"E",required:["model","label"],replace:!0,transclude:!0,scope:{model:"=",label:"@",settings:"=",enabled:"=",indeterminateValue:"=",checkedValue:"=",uncheckedValue:"=",children:"@",onInit:"=",onChange:"=",onChecked:"=",onIndeterminate:"=",onDeterminate:"=",onUnchecked:"=",onEnable:"=",onDisable:"="},template:['<div class="ui checkbox">','  <input type="checkbox">',"  <label>{{ label }}</label>","</div>"].join("\n"),link:function(scope,element,attrs){element.ready(function(){var settings=scope.settings||{},checkedValue=function(){return angular.isDefined(scope.checkedValue)?scope.checkedValue:!0},uncheckedValue=function(){return angular.isDefined(scope.uncheckedValue)?scope.uncheckedValue:!1},indeterminateValue=function(){return angular.isDefined(scope.indeterminateValue)?scope.indeterminateValue:void 0},modelWatcher=SemanticUI.watcher(scope,"model",function(updated){angular.isDefined(updated)&&element.checkbox(updated?"set checked":"set unchecked")}),enabledWatcher=SemanticUI.watcher(scope,"enabled",function(updated){angular.isDefined(updated)&&element.checkbox(updated?"set enabled":"set disabled")});if(SemanticUI.onEvent(settings,"onChecked",function(){modelWatcher.set(checkedValue())}),SemanticUI.onEvent(settings,"onUnchecked",function(){modelWatcher.set(uncheckedValue())}),SemanticUI.onEvent(settings,"onIndeterminate",function(){modelWatcher.set(indeterminateValue())}),SemanticUI.onEvent(settings,"onEnable",function(value){enabledWatcher.set(!0)}),SemanticUI.onEvent(settings,"onDisable",function(value){enabledWatcher.set(!1)}),SemanticUI.linkEvents(scope,settings,{onChange:"onChange",onChecked:"onChecked",onIndeterminate:"onIndeterminate",onDeterminate:"onDeterminate",onUnchecked:"onUnchecked",onEnable:"onEnable",onDisable:"onDisable"}),scope.children){var $children=$(scope.children),settingChildren=!1;SemanticUI.onEvent(settings,"onChecked",function(){settingChildren=!0,$children.checkbox("check"),settingChildren=!1}),SemanticUI.onEvent(settings,"onUnchecked",function(){settingChildren=!0,$children.checkbox("uncheck"),settingChildren=!1}),$children.children("input[type=checkbox], input[type=radio]").change(function(){if(!settingChildren){var checked=0;$children.each(function(i,child){$(child).checkbox("is checked")&&checked++}),element.checkbox(0===checked?"uncheck":checked===$children.length?"check":"indeterminate")}})}element.checkbox(settings),scope.model==checkedValue()?element.checkbox("set checked"):scope.model===indeterminateValue()&&element.checkbox("set indeterminate"),angular.isDefined(scope.enabled)&&!scope.enabled&&element.checkbox("set disabled"),angular.isFunction(scope.onInit)&&scope.onInit(element)})}}}])}(angular.module("semantic-ui")),function(app){app.directive("smRadioBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smRadioBind","checkbox")}]);var BEHAVIORS={smRadioCheck:"check",smRadioEnable:"enable",smRadioDisable:"disable"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"checkbox",method)}])}),app.directive("smRadio",["SemanticUI",function(SemanticUI){return{restrict:"E",required:["value","label","name","model"],replace:!0,transclude:!0,scope:{model:"=",label:"@",name:"@",value:"=",settings:"=",enabled:"=",onInit:"=",onChange:"=",onChecked:"=",onUnchecked:"=",onEnable:"=",onDisable:"="},template:['<div class="ui radio checkbox">','  <input name="{{ name }}" type="radio">',"  <label>{{ label }}</label>","</div>"].join("\n"),link:function(scope,element,attrs){element.ready(function(){var settings=scope.settings||{},modelWatcher=SemanticUI.watcher(scope,"model",function(updated){updated===scope.value&&element.checkbox("set checked")}),enabledWatcher=SemanticUI.watcher(scope,"enabled",function(updated){angular.isDefined(updated)&&element.checkbox(updated?"set enabled":"set disabled")});SemanticUI.onEvent(settings,"onChecked",function(){modelWatcher.set(scope.value)}),SemanticUI.onEvent(settings,"onEnable",function(value){enabledWatcher.set(!0)}),SemanticUI.onEvent(settings,"onDisable",function(value){enabledWatcher.set(!1)}),SemanticUI.linkEvents(scope,settings,{onChange:"onChange",onChecked:"onChecked",onUnchecked:"onUnchecked",onEnable:"onEnable",onDisable:"onDisable"}),element.checkbox(settings),scope.model===scope.value&&element.checkbox("set checked"),element.hasClass("slider")&&element.removeClass("radio"),angular.isDefined(scope.enabled)&&!scope.enabled&&element.checkbox("set disabled"),angular.isFunction(scope.onInit)&&scope.onInit(element)})}}}])}(angular.module("semantic-ui")),function(app){app.directive("smDimmerBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smDimmerBind","dimmer")}]);var BEHAVIORS={smDimmerShow:"show",smDimmerHide:"hide",smDimmerToggle:"toggle"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"dimmer",method)}])}),app.directive("smDimmer",["SemanticUI",function(SemanticUI){return{restrict:"E",replace:!0,transclude:!0,scope:{visible:"=",settings:"=",onInit:"=",onShow:"=",onHide:"=",onChange:"="},template:'<div class="ui dimmer" ng-transclude></div>',link:function(scope,element,attributes){var settings=scope.settings||{},visibleWatcher=SemanticUI.watcher(scope,"visible",function(updated){element.dimmer(updated?"show":"hide")});SemanticUI.onEvent(settings,"onShow",function(value){visibleWatcher.set(!0)}),SemanticUI.onEvent(settings,"onHide",function(value){visibleWatcher.set(!1)}),SemanticUI.linkEvents(scope,settings,{onShow:"onShow",onHide:"onHide",onChange:"onChange"}),element.dimmer(settings),angular.isFunction(scope.onInit)&&scope.onInit(element)}}}])}(angular.module("semantic-ui")),function(app){app.directive("smDropdownBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smDropdownBind","dropdown")}]);var BEHAVIORS={smDropdownToggle:"toggle",smDropdownShow:"show",smDropdownHide:"hide",smDropdownClear:"clear",smDropdownHideOthers:"hide others",smDropdownRestoreDefaults:"restore defaults",smDropdownRestoreDefaultText:"restore default text",smDropdownRestoreDefaultValue:"restore default value",smDropdownSaveDefaults:"save defaults",smDropdownSetSelected:"set selected",smDropdownSetText:"set text",smDropdownSetValue:"set value",smDropdownBindTouchEvents:"bind touch events",smDropdownMouseEvents:"mouse events",smDropdownBindIntent:"bind intent",smDropdownUnbindIntent:"unbind intent",smDropdownSetActive:"set active",smDropdownSetVisible:"set visible",smDropdownRemoveActive:"remove active",smDropdownRemoveVisible:"remove visible"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"dropdown",method)}])}),app.directive("smDropdown",["SemanticUI",function(SemanticUI){return{restrict:"E",replace:!0,transclude:!0,scope:{model:"=",items:"=",label:"&",value:"&",settings:"=",defaultText:"=",onInit:"=",onChange:"=",onAdd:"=",onRemove:"=",onLabelCreate:"=",onLabelSelect:"=",onNoResults:"=",onShow:"=",onHide:"="},template:['<div class="ui dropdown">','<span class="text" ng-class="{default: hasDefault()}" sm-html="getText()"></span>','<i class="dropdown icon"></i>',"<sm-flat-menu></sm-flat-menu>","</div>"].join("\n"),controller:function($scope){$scope.getValue=function(item){var value=$scope.value({item:item});return value?value.$$hashKey||value:value},$scope.hasDefault=function(){return $scope.defaultText?$scope.findMatchingItem($scope.model)?!1:!0:!1},$scope.getText=function(){var selected=$scope.findMatchingItem($scope.model);return selected?$scope.label({item:selected}):$scope.defaultText},$scope.findMatchingItem=function(value){var matching=null;return angular.forEach($scope.items,function(item){var itemValue=$scope.value({item:item});itemValue===value&&(matching=item)}),matching}},link:function(scope,element,attrs){var hashMap={},settings=scope.settings||{},modelWatcher=SemanticUI.watcher(scope,"model",function(updated){element.dropdown("set value",updated)});SemanticUI.onEvent(settings,"onChange",function(value){modelWatcher.set(value in hashMap?hashMap[value]:value)}),SemanticUI.linkEvents(scope,settings,{onChange:"onChange",onAdd:"onAdd",onRemove:"onRemove",onLabelCreate:"onLabelCreate",onLabelSelect:"onLabelSelect",onNoResults:"onNoResults",onShow:"onShow",onHide:"onHide"}),scope.$watch("items",function(updated){hashMap={},angular.forEach(updated,function(item){item.$$hashKey&&(hashMap[item.$$hashKey]=item)})},!0),element.dropdown(settings),angular.isFunction(scope.onInit)&&scope.onInit(element)}}}])}(angular.module("semantic-ui")),function(app){app.directive("smEmbedBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smEmbedBind","embed")}]);var BEHAVIORS={smEmbedReset:"reset",smEmbedShow:"show",smEmbedHide:"hide",smEmbedDestroy:"destroy"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"embed",method)}])}),app.directive("smEmbed",["SemanticUI",function(SemanticUI){return{restrict:"E",replace:!0,transclude:!0,scope:{source:"@",sourceId:"@",placeholder:"@",icon:"@",settings:"=",onInit:"=",onCreate:"=",onDisplay:"=",onPlaceholderDisplay:"=",onEmbed:"="},template:'<div class="ui embed"></div>',link:function(scope,element,attributes){var settings=scope.settings||{};scope.source&&(settings.source=scope.source),scope.sourceId&&(settings.id=scope.sourceId),scope.placeholder&&(settings.placeholder=scope.placeholder),scope.icon&&(settings.icon=scope.icon),SemanticUI.linkEvents(scope,settings,{onCreate:"onCreate",onDisplay:"onDisplay",onPlaceholderDisplay:"onPlaceholderDisplay",onEmbed:"onEmbed"}),element.embed(settings),angular.isFunction(scope.onInit)&&scope.onInit(element)}}}])}(angular.module("semantic-ui")),function(app){app.directive("smModalBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smModalBind","modal")}]);var BEHAVIORS={smModalShow:"show",smModalHide:"hide",smModalToggle:"toggle",smModalRefresh:"refresh",smModalShowDimmer:"show dimmer",smModalHideDimmer:"hide dimmer",smModalHideOthers:"hide others",smModalHideAll:"hide all",smModalCacheSizes:"cache sizes",smModalSetActive:"set active"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"modal",method)}])}),app.directive("smModal",["SemanticUI",function(SemanticUI){return{restrict:"E",replace:!0,transclude:!0,scope:{visible:"=",settings:"=",onInit:"=",onShow:"=",onVisible:"=",onHide:"=",onHidden:"=",onApprove:"=",onDeny:"="},template:'<div class="ui modal" ng-transclude></div>',link:function(scope,element,attrs){var settings=scope.settings||{},visibleWatcher=SemanticUI.watcher(scope,"visible",function(updated){element.modal(updated?"show":"hide")});SemanticUI.onEvent(settings,"onHide",function(){visibleWatcher.set(!1)}),SemanticUI.linkEvents(scope,settings,{onShow:"onShow",onVisible:"onVisible",onHide:"onHide",onHidden:"onHidden",onApprove:"onApprove",onDeny:"onDeny"}),element.modal(settings),angular.isFunction(scope.onInit)&&scope.onInit(element)}}}])}(angular.module("semantic-ui")),function(app){app.directive("smPopupBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smPopupBind","popup")}]);var BEHAVIORS={smPopupShow:"show",smPopupHide:"hide",smPopupHideAll:"hide all",smPopupToggle:"toggle",smPopupReposition:"reposition",smPopupDestroy:"destroy",smPopupRemove:"remove popup"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"popup",method)}])}),app.directive("smPopup",["SemanticUI",function(SemanticUI){return{restrict:"A",scope:{smPopup:"=",smPopupTitle:"=",smPopupPosition:"@",smPopupSettings:"=",smPopupOnInit:"=",smPopupOnCreate:"=",smPopupOnRemove:"=",smPopupOnShow:"=",smPopupOnVisible:"=",smPopupOnHide:"=",smPopupOnHidden:"="},link:function(scope,element,attributes){var settings=scope.smPopupSettings||{};SemanticUI.bindAttribute(scope,"smPopup",element,"data-content"),SemanticUI.bindAttribute(scope,"smPopupTitle",element,"data-title"),SemanticUI.bindAttribute(scope,"smPopupPosition",element,"data-position"),SemanticUI.linkEvents(scope,settings,{onCreate:"smPopupOnCreate",onRemove:"smPopupOnRemove",onShow:"smPopupOnShow",onVisible:"smPopupOnVisible",onHide:"smPopupOnHide",onHidden:"smPopupOnHidden"}),element.popup(settings),angular.isFunction(scope.smPopupOnInit)&&scope.smPopupOnInit(element)}}}]),app.directive("smPopupInline",["SemanticUI",function(SemanticUI){return{restrict:"A",scope:{smPopupInline:"=",smPopupInlineOnInit:"=",smPopupInlineOnCreate:"=",smPopupInlineOnRemove:"=",smPopupInlineOnShow:"=",smPopupInlineOnVisible:"=",smPopupInlineOnHide:"=",smPopupInlineOnHidden:"="},link:function(scope,element,attributes){var settings=scope.smPopupInline||{};SemanticUI.linkEvents(scope,settings,{onCreate:"smPopupInlineOnCreate",onRemove:"smPopupInlineOnRemove",onShow:"smPopupInlineOnShow",onVisible:"smPopupInlineOnVisible",onHide:"smPopupInlineOnHide",onHidden:"smPopupInlineOnHidden"}),settings.inline=!0,element.popup(settings),angular.isFunction(scope.smPopupInlineOnInit)&&scope.smPopupInlineOnInit(element)}}}]),app.directive("smPopupDisplay",["SemanticUI",function(SemanticUI){return{restrict:"A",scope:{smPopupDisplaySettings:"=",smPopupDisplayOnInit:"=",smPopupDisplayOnCreate:"=",smPopupDisplayOnRemove:"=",smPopupDisplayOnShow:"=",smPopupDisplayOnVisible:"=",smPopupDisplayOnHide:"=",smPopupDisplayOnHidden:"="},link:function(scope,element,attributes){var settings=scope.smPopupDisplaySettings||{};SemanticUI.linkEvents(scope,settings,{onCreate:"smPopupDisplayOnCreate",onRemove:"smPopupDisplayOnRemove",onShow:"smPopupDisplayOnShow",onVisible:"smPopupDisplayOnVisible",onHide:"smPopupDisplayOnHide",onHidden:"smPopupDisplayOnHidden"}),settings.popup='[data-popup-named="'+attributes.smPopupDisplay+'"]',element.popup(settings),angular.isFunction(scope.smPopupDisplayOnInit)&&scope.smPopupDisplayOnInit(element)}}}]),app.directive("smPopupDetached",function(){return{restrict:"E",replace:!0,transclude:!0,scope:{name:"@"},template:'<div class="ui special popup" data-popup-named="{{ name }}" ng-transclude></div>'}})}(angular.module("semantic-ui")),function(app){app.directive("smProgressBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smProgressBind","progress")}]);var BEHAVIORS={};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"progress",method)}])}),app.directive("smProgress",["SemanticUI",function(SemanticUI){return{restrict:"E",replace:!0,transclude:!0,scope:{value:"=",showPercent:"@",onInit:"=",onChange:"=",onSuccess:"=",onActive:"=",onError:"=",onWarning:"="},template:['<div class="ui progress">','  <div class="bar" style="transition-duration: 300ms; -webkit-transition-duration: 300ms; width: {{ value }}%;">','    <div class="progress" ng-if="showPercent">{{ value }}%</div>',"  </div>",'  <div class="label" ng-transclude></div>',"</div>"].join("\n"),link:function(scope,element,attributes){var settings=scope.settings||{};SemanticUI.linkEvents(scope,settings,{onChange:"onChange",onSuccess:"onSuccess",onActive:"onActive",onError:"onError",onWarning:"onWarning"}),angular.isFunction(scope.onInit)&&scope.onInit(element)}}}])}(angular.module("semantic-ui")),function(app){app.directive("smSearchBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smSearchBind","search")}]);var BEHAVIORS={smSearchQuery:"query",smSearchCancelQuery:"cancel query",smSearchSearchLocal:"search local",smSearchSearchRemote:"search remote",smSearchSetValue:"set value",smSearchShowResults:"show results",smSearchHideResults:"hide results",smSearchDestroy:"destroy"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"search",method)}])}),app.directive("smSearch",["SemanticUI",function(SemanticUI){return{restrict:"E",replace:!0,scope:{value:"=",icon:"@",placeholder:"@",local:"=",remove:"@",settings:"=",onInit:"=",onResultsAdd:"=",onSearchQuery:"=",onResults:"=",onResultsOpen:"=",onResultsClose:"="},template:['<div class="ui search">','  <div class="ui icon input">','    <input class="prompt" type="text" placeholder="{{ placeholder }}" ng-model="value">','    <i class="{{ icon }} icon"></i>',"  </div>",'  <div class="results"></div>',"</div>"].join("\n"),controller:function($scope){$scope.icon=$scope.icon||"search"},link:function(scope,element,attributes){var settings=scope.settings||{};scope.local&&(settings.source=scope.local),scope.remote&&(settings.apiSettings={url:scope.remote}),SemanticUI.linkEvents(scope,settings,{onResultsAdd:"onResultsAdd",onSearchQuery:"onSearchQuery",onResults:"onResults",onResultsOpen:"onResultsOpen",onResultsClose:"onResultsClose"}),element.search(settings),angular.isFunction(scope.onInit)&&scope.onInit(element)}}}])}(angular.module("semantic-ui")),function(app){app.directive("smShapeBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smShapeBind","shape")}]);var BEHAVIORS={smShapeFlipUp:"flip up",smShapeFlipDown:"flip down",smShapeFlipLeft:"flip left",smShapeFlipRight:"flip right",smShapeFlipOver:"flip over",smShapeFlipBack:"flip back",smShapeSetNextSide:"set next side",smShapeReset:"reset",smShapeQueue:"queue",smShapeRepaint:"repaint",smShapeSetDefaultSide:"set default side",smShapeSetStageSize:"set stage size",smShapeRefresh:"refresh"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"shape",method)}])})}(angular.module("semantic-ui")),function(app){app.directive("smSidebarBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smSidebarBind","sidebar")}]);var BEHAVIORS={smSidebarShow:"show",smSidebarHide:"hide",smSidebarToggle:"toggle",smSidebarPushPage:"push page",smSidebarPullPage:"pull page",smSidebarAddBodyCss:"add body css",smSidebarRemoveBodyCss:"remove body css"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"sidebar",method)}])}),app.directive("smSidebar",["SemanticUI",function(SemanticUI){return{restrict:"E",replace:!0,scope:{visible:"=",settings:"=",onInit:"=",onVisible:"=",onShow:"=",onChange:"=",onHide:"=",onHidden:"="},template:'<sm-flat-menu class="ui sidebar"></sm-flat-menu>',link:function(scope,element,attributes){var settings=scope.settings||{},visibleWatcher=SemanticUI.watcher(scope,"visible",function(updated){element.sidebar(updated?"show":"hide")});SemanticUI.onEvent(settings,"onHide",function(){visibleWatcher.set(!1)}),SemanticUI.onEvent(settings,"onShow",function(){visibleWatcher.set(!0)}),SemanticUI.linkEvents(scope,settings,{onVisible:"onVisible",onShow:"onShow",onChange:"onChange",onHide:"onHide",onHidden:"onHidden"}),element.sidebar(settings),angular.isFunction(scope.onInit)&&scope.onInit(element)}}}])}(angular.module("semantic-ui")),function(app){app.directive("smStickyBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smStickyBind","sticky")}]);var BEHAVIORS={smStickyRefresh:"refresh"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"sticky",method)}])}),app.directive("smSticky",["SemanticUI",function(SemanticUI){return{restrict:"E",replace:!0,transclude:!0,scope:{settings:"=",onInit:"=",onReposition:"=",onScroll:"=",onStick:"=",onUnstick:"=",onTop:"=",onBottom:"="},template:'<div class="ui sticky" ng-transclude></div>',link:function(scope,element,attributes){element.ready(function(){var settings=scope.settings||{};SemanticUI.linkEvents(scope,settings,{onReposition:"onReposition",onScroll:"onScroll",onStick:"onStick",onStick:"onStick",onTop:"onTop",onBottom:"onBottom"}),element.sticky(settings),angular.isFunction(scope.onInit)&&scope.onInit(element)})}}}])}(angular.module("semantic-ui")),function(app){app.directive("smTabBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smTabBind","tab")}]);var BEHAVIORS={smTabReset:"reset",smTabShow:"show",smTabHide:"hide",smTabDestroy:"destroy"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"tab",method)}])}),app.directive("smTabMenu",["SemanticUI",function(SemanticUI){return{restrict:"E",replace:!0,scope:{tabs:"=",active:"@"},template:['<div class="ui menu">','  <a class="item" ng-repeat="(name, title) in tabs" ng-class="{active: name === active}" data-tab="{{ name }}">{{ title }}</a>',"</div>"].join("\n"),controller:function($scope){if(!($scope.active in $scope.tabs))for(var prop in $scope.tabs){$scope.active=prop;break}},link:function(scope,element,attributes){element.ready(function(){var settings=scope.settings||{};element.children(".item").tab(settings)})}}}]),app.directive("smTab",["SemanticUI",function(SemanticUI){return{restrict:"E",replace:!0,transclude:!0,scope:{name:"@"},template:'<div class="ui bottom attached tab segment" data-tab="{{ name }}" ng-transclude></div>'}}])}(angular.module("semantic-ui")),function(app){app.directive("smTransition",["SemanticUI",function(SemanticUI){return{restrict:"A",scope:{smTransition:"@",smTransitionEvents:"@",smTransitionOther:"@"},link:function(scope,element,attributes){scope.smTransitionEvents=scope.smTransitionEvents||"click",element.on(scope.smTransitionEvents,function(){(scope.smTransitionOther?$(scope.smTransitionOther):element).transition(scope.smTransition)})}}}])}(angular.module("semantic-ui")),function(app){app.directive("smRatingBind",["SemanticUI",function(SemanticUI){return SemanticUI.createBind("smRatingBind","rating")}]);var BEHAVIORS={smRatingSetRating:"set rating",smRatingDisable:"disable",smRatingEnable:"enable",smRatingClear:"clear rating"};angular.forEach(BEHAVIORS,function(method,directive){app.directive(directive,["SemanticUI",function(SemanticUI){return SemanticUI.createBehavior(directive,"rating",method)}])}),app.directive("smRating",["SemanticUI",function(SemanticUI){return{restrict:"E",replace:!0,scope:{value:"=",total:"=",type:"@",disabled:"=",settings:"=",onInit:"=",onRate:"="},template:'<div class="ui rating {{ type }}" data-rating="{{ value }}" data-max-rating="{{ total }}"></div>',link:function(scope,element,attributes){element.ready(function(){var settings=scope.settings||{},valueWatcher=(SemanticUI.watcher(scope,"disabled",function(updated){element.rating(updated?"disable":"enable")}),SemanticUI.watcher(scope,"value",function(updated){element.rating("set rating",updated)}));SemanticUI.onEvent(settings,"onRate",function(value){valueWatcher.set(value)}),SemanticUI.linkEvents(scope,settings,{onRate:"onRate"}),element.rating(settings),angular.isFunction(scope.onInit)&&scope.onInit(element)})}}}])}(angular.module("semantic-ui"));
//# sourceMappingURL=angular-semantic-ui.js.map