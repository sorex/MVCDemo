/// <reference path="../jquery-1.6.2-vsdoc.js" />
/// <reference path="../jquery-ui-1.8.15.js" />

	//JQuery UI DataPager Plugin
	/*
	* jQuery UI DataPager 
	*
	* Depends:
	*	jquery.ui.core.js
	*	jquery.ui.widget.js
	*/
	(function ($, undefined)
	{
		$.widget("ui.JdataPager", {
			options: {
				onPageChange: null,
				onClickSearch: null,
				formatLeft: "{Refresh}{Search}{Space}{Space}{First}{Prev}{Space}{IndexButton}{Space}{Next}{Last}", //左侧显示的格式化字符串
				formatRight: "{Input}<span isWord='true'>第{PageIndex}页，共{MaxPage}页。第{Start}~{End}条，共计{RecordCount}条。</span>", //右侧显示的格式化字符串
				BeforeButtonNumber: 2, //
				formatPageIndexFirst: "1...", //第一个显示的格式化字符串 支持Index,Max
				formatPageIndexMiddle: "{Index}", //中间显示的格式化字符串 支持Index,Max
				formatPageIndexLast: "...{Max}", //结尾显示的格式化字符串 支持Index,Max
				PageIndex: 1, //当前页数
				PageSize: 15, //页数据量
				RecordCount: 0, //总数据量
				NoResultsText: "对不起，没有找到您的搜索结果。",
				firstText: '首页',
				prevText: '上一页',
				nextText: '下一页',
				lastText: '末页',
				refreshText: "刷新",
				searchText: "查询",
				goText: "跳转"
			},

			_create: function ()
			{
				this._JdataPagerify();
			},

			_setOption: function (key, value)
			{
				if (value !== undefined || value != null)
					this.options[key] = value;
				else
					return this.options[key];
			},

			_setOptions: function (options)
			{
				var self = this, refresh = false;

				$.each(options, function (key, value)
				{
					self._setOption(key, value);
					if (key == "PageIndex" || key == "PageSize" || key == "RecordCount")
						refresh = true;
				});
				if (refresh && self.options.onPageChange != null)
					self.options.onPageChange(self.options.PageIndex, self.options.PageSize);
				self._JdataPagerify();
			},

			_JdataPagerify: function ()
			{
				$(this.element).empty();
				var self = this,
				o = this.options,
				BeforeButtonNumber = parseInt(o.BeforeButtonNumber + ""),
				PageIndex = parseInt(o.PageIndex + ""),
				PageSize = parseInt(o.PageSize + ""),
				RecordCount = parseInt(o.RecordCount + "");

				if (isNaN(BeforeButtonNumber) || BeforeButtonNumber <= 0)
				{
					BeforeButtonNumber = JdataPagerDefault.BeforeButtonNumber;
					o.BeforeButtonNumber = JdataPagerDefault.BeforeButtonNumber;
				}
				if (isNaN(PageIndex) || PageIndex <= 0)
				{
					PageIndex = JdataPagerDefault.PageIndex;
					o.PageIndex = JdataPagerDefault.PageIndex;
				}
				if (isNaN(PageSize) || PageSize <= 0)
				{
					PageSize = JdataPagerDefault.PageSize;
					o.PageSize = JdataPagerDefault.PageSize;
				}

				var PageMax = Math.ceil(RecordCount / PageSize);

				if (isNaN(PageMax) || PageMax <= 0)
				{
					PageMax = 1;
				}
				if (PageIndex > PageMax)
				{
					PageIndex = PageMax;
					o.PageIndex = PageMax;
				}
				var StateIndex = (PageIndex - 1) * PageSize + 1,
				EndIndex = PageIndex * PageSize > RecordCount ? RecordCount : PageIndex * PageSize;

				if (RecordCount > 0)
				{
					$(this.element).removeClass("ui-state-error")
					$(this.element).addClass("ui-widget-header");

					var r = "<span><a href='#' title='" + o.refreshText + "' class='ui-icon ui-icon-refresh'></a></span>";
					var s = "<span><a href='#' title='" + o.searchText + "' class='ui-icon ui-icon-search'></a></span>";
					var f = "<span><a href='#' title='" + o.firstText + "' class='ui-icon ui-icon-seek-start'></a></span>";
					var p = "<span><a href='#' title='" + o.prevText + "' class='ui-icon ui-icon-seek-prev'></a></span>";
					var n = "<span><a href='#' title='" + o.nextText + "' class='ui-icon ui-icon-seek-next'></a></span>";
					var l = "<span><a href='#' title='" + o.lastText + "' class='ui-icon ui-icon-seek-end'></a></span>";

					var space = "<span isSpace='true'></span>";
					var pageButtons = ""
					var AddPageNumber = function (pageIndex, text)
					{
						return "<span><a style='display: block;' href='#' title='" + pageIndex + "' pageIndex='" + pageIndex + "'>" + text + "</a></span>";
					};

					var FormatPageIndex = function (oldString, Index, Max)
					{
						return oldString.replace(/{Index}/g, Index).replace(/{Max}/g, Max);
					};

					if (BeforeButtonNumber > 0)
					{
						if (PageIndex > BeforeButtonNumber + 1 && o.formatPageIndexFirst != "")
						{
							if (PageIndex == BeforeButtonNumber + 1 + 1 || 2 * BeforeButtonNumber + 1 + 1 == PageMax)
								pageButtons += AddPageNumber(1, FormatPageIndex(o.formatPageIndexMiddle, 1, PageMax));
							else
								pageButtons += AddPageNumber(1, FormatPageIndex(o.formatPageIndexFirst, PageIndex, PageMax));
						}

						if (PageIndex <= BeforeButtonNumber)
							for (var i = 0; i < BeforeButtonNumber * 2 + 1; i++)
							{
								var tempPage = i + 1;
								if (tempPage <= PageMax)
									pageButtons += AddPageNumber(tempPage, FormatPageIndex(o.formatPageIndexMiddle, tempPage, PageMax));
							}
						else if (PageIndex >= PageMax - BeforeButtonNumber)
							for (var i = 0; i < BeforeButtonNumber * 2 + 1; i++)
							{
								var tempPage = PageMax - BeforeButtonNumber * 2 + i;
								if (tempPage > 0 && tempPage <= PageMax)
									pageButtons += AddPageNumber(tempPage, FormatPageIndex(o.formatPageIndexMiddle, tempPage, PageMax));
							}
						else
						{
							for (var i = 0; i < BeforeButtonNumber; i++)
							{
								var tempPage = PageIndex - BeforeButtonNumber + i;
								pageButtons += AddPageNumber(tempPage, FormatPageIndex(o.formatPageIndexMiddle, tempPage, PageMax));
							}
							pageButtons += AddPageNumber(PageIndex, FormatPageIndex(o.formatPageIndexMiddle, PageIndex, PageMax));
							for (var i = 0; i < BeforeButtonNumber; i++)
							{
								var tempPage = PageIndex + i + 1;
								pageButtons += AddPageNumber(tempPage, FormatPageIndex(o.formatPageIndexMiddle, tempPage, PageMax));
							}
						}

						if (PageIndex < PageMax - BeforeButtonNumber && o.formatPageIndexLast != "")
						{
							if (PageIndex == PageMax - BeforeButtonNumber - 1 || 2 * BeforeButtonNumber + 1 + 1 == PageMax)
								pageButtons += AddPageNumber(PageMax, FormatPageIndex(o.formatPageIndexMiddle, PageMax, PageMax));
							else
								pageButtons += AddPageNumber(PageMax, FormatPageIndex(o.formatPageIndexLast, PageIndex, PageMax));
						}
					}

					var input = "<input type='text' style='width: 50px; height:18px;' value='" + PageIndex + "' />"
					+ "<span><a href='#' title='" + o.goText + "' class='ui-icon ui-icon-arrowreturnthick-1-e'></a></span>";

					var FormatString = function (oldString)
					{
						return oldString.replace(/{Refresh}/g, r).replace(/{Search}/g, s).replace(/{First}/g, f).replace(/{Prev}/g, p).replace(/{Next}/g, n).replace(/{Last}/g, l).replace(/{IndexButton}/g, pageButtons).replace(/{Input}/g, input).replace(/{PageIndex}/g, PageIndex).replace(/{MaxPage}/g, PageMax).replace(/{Start}/g, StateIndex).replace(/{End}/g, EndIndex).replace(/{RecordCount}/g, RecordCount).replace(/{Space}/g, space);
					};
					var LeftHtml = FormatString(o.formatLeft);
					var RightHtml = FormatString(o.formatRight);
					$(this.element).append("<div style='float:left;'>" + LeftHtml + "</div><div style='float:right;'>" + RightHtml + "</div>");

					/*限制*/
					//onkeypress="number()" onkeyup="filterInput()" onchange="filterInput()" onbeforepaste="filterPaste()" onpaste="return false"
					var filterInput = function ()
					{
						if (event.type.indexOf("key") != -1)
						{
							var re = /37|38|39|40/g;
							if (event.keyCode.toString().match(re))
								return false;
						}
						event.srcElement.value = event.srcElement.value.replace(/[^0-9]/g, "");
					};
					$(":text", $(this.element)).bind("keypress.JdataPager", function ()
					{
						var char = String.fromCharCode(event.keyCode);
						var re = /[0-9]/g;
						event.returnValue = char.match(re) != null ? true : false;
					})
					.bind("keyup.JdataPager", filterInput)
					.bind("change.JdataPager", filterInput)
					.bind("beforepaste.JdataPager", function ()
					{
						var oTR = this.document.selection.createRange();
						var text = window.clipboardData.getData("text");
						oTR.text = text.replace(/[^0-9]/g, "");
					}).bind("paste.JdataPager", function ()
					{
						return false;
					});

					/*样式*/
					$(this.element).addClass("ui-widget-header ui-helper-clearfix");
					//$("div", $(this.element)).addClass("ui-helper-clearfix")
					$("span:not(span[isSpace],span[isWord])", $(this.element)).addClass("ui-state-default")

					$("span", $(this.element)).css({ "float": "left", "margin": "4px 4px 4px 4px", "min-width": "16px", "text-align": "center" });
					$(":text", $(this.element)).css({ "float": "left", "margin": "4px 4px 4px 4px", "text-align": "right" });

					/*状态*/
					$("span:not(span[isSpace],span[isWord])", $(this.element)).bind("mouseover.JdataPager", function ()
					{
						if ($(this).is(":not(.ui-state-disabled)"))
						{
							$(this).addClass("ui-state-hover");
						}
					});
					$("span:not(span[isSpace],span[isWord])", $(this.element)).bind("mouseout.JdataPager", function ()
					{
						$(this).removeClass("ui-state-hover");
					});
					$("a[pageIndex='" + PageIndex + "']").closest("span").addClass("ui-state-highlight");

					if (PageIndex <= 1)
					{
						$("a.ui-icon-seek-start,a.ui-icon-seek-prev", $(this.element)).each(function ()
						{
							$(this).closest("span").addClass("ui-state-disabled");
							$(this).addClass("ui-state-disabled");
						});
					}
					if (PageIndex >= PageMax)
					{
						$("a.ui-icon-seek-next,a.ui-icon-seek-end", $(this.element)).each(function ()
						{
							$(this).closest("span").addClass("ui-state-disabled");
							$(this).addClass("ui-state-disabled");
						});
					}

					/*事件*/
					$("a[pageIndex]", $(this.element)).bind("click.JdataPager", function ()
					{
						self._setOptions({ "PageIndex": $(this).attr("pageIndex") });
					});
					$("a.ui-icon-refresh", $(this.element)).bind("click.JdataPager", function ()
					{
						self._setOptions({ "PageIndex": PageIndex });
					});
					$("a.ui-icon-arrowreturnthick-1-e", $(this.element)).bind("click.JdataPager", function ()
					{
						self._setOptions({ "PageIndex": $(":text", $(self.element)).val() });
					});
					if (PageIndex > 1 && PageIndex <= PageMax)
					{
						$("a.ui-icon-seek-start", $(this.element)).bind("click.JdataPager", function ()
						{
							self._setOptions({ "PageIndex": 1 });
						});
						$("a.ui-icon-seek-prev", $(this.element)).bind("click.JdataPager", function ()
						{
							self._setOptions({ "PageIndex": PageIndex - 1 });
						});
					}
					if (PageIndex >= 1 && PageIndex < PageMax)
					{
						$("a.ui-icon-seek-next", $(this.element)).bind("click.JdataPager", function ()
						{
							self._setOptions({ "PageIndex": PageIndex + 1 });
						});
						$("a.ui-icon-seek-end", $(this.element)).bind("click.JdataPager", function ()
						{
							self._setOptions({ "PageIndex": PageMax });
						});
					}
					if (o.onClickSearch != null)
					{
						$("a.ui-icon-seek-search", $(this.element)).bind("click.JdataPager", function ()
						{
							if (o.onClickSearch != null)
								o.onClickSearch();
						});
					}
				}
				else
				{
					$(this.element).removeClass("ui-widget-header")
					$(this.element).addClass("ui-state-error");
					$(this.element).append("<p>" + o.NoResultsText + "</p>");
				}
			},

			destroy: function ()
			{
				var o = this.options;

				$(this.element).empty();
				$(this).empty();

				return this;
			}
		});

		var JdataPagerDefault = {
			BeforeButtonNumber: 2,
			PageIndex: 1,
			PageSize: 15
		};

		$.extend($.ui.JdataPager, {
			version: "0.1.0"
		});
	})(jQuery);
