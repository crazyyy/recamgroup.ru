$(document).ready(function(){function t(t){return t.replace(/(\s)+/g,"").replace(/(\d{1,3})(?=(?:\d{3})+$)/g,"$1 ")}function e(t){$.post("scoring.php/?command=api-addRequest",t)}function n(){$("#online-air table tbody tr td.time").each(function(){var t=(new Date).getTime(),e=Math.floor((t-$(this).attr("data-timestamp"))/1e3),n=Math.floor(e/3600),i=Math.floor(e%3600/60),a=e%60,d=n>0?n+" ч ":"";d+=i>0?i+" мин ":"",d+=a+" сек назад",$(this).html(d)})}function i(t){$.ajax({url:"scoring.php/?command=getResult",dataType:"json",async:!1,success:function(e){var n=(new Date).getTime(),i=n-3e3*t,a='<tr><td class="time" data-timestamp="'+i+'">'+3*t+' сек назад</td><td class="number">№'+e.number+'</td><td class="sum">'+String(e.sum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1&thinsp;")+"&thinsp;р</td>";a+=0==e.status?'<td>–</td><td>–</td><td class="active">–</td><td class="active">–</td><td class="denied">отказ в '+e.total_banks+" банках</td>":"<td>"+String(e.payment_wod).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1&thinsp;")+"&thinsp;р/мес</td><td>"+String(e.max_sum_wod).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1&thinsp;")+'&thinsp;р</td><td class="active">'+String(e.payment_wd).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1&thinsp;")+'&thinsp;р/мес</td><td class="active">'+String(e.max_sum_wd).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1&thinsp;")+'&thinsp;р</td><td class="approved">одобрен в '+e.appr_banks+" из "+e.total_banks+" банках</td>",a+="</tr>",a=$(a),a.appendTo("#online-air table tbody")},error:function(){console.log("Ошибка загрузки JSON")}})}function a(){$.getJSON("scoring.php/?command=getResult",function(t){var e=$('<tr><td class="time">0 сек назад</td><td class="number"></td><td class="sum"></td><td colspan="5" class="colspan"><div class="solution-status">Отправка данных посетителя...</div><div class="percent">0%</div><div class="mini-progress-wrap"><div class="mini-progress"></div></div><div class="clearfix"></div></td></tr>'),n=(new Date).getTime();e.find(".time").attr("data-timestamp",n).html("0 сек назад"),e.find(".number").html("№"+t.number),e.find(".sum").html(String(t.sum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1&thinsp;")+"&thinsp;р"),e.prependTo("#online-air table tbody").hide().fadeIn("slow",function(){e.find(".mini-progress").stop().animate({width:"30%"},{duration:2500,start:function(){$(this).parent().siblings(".solution-status").html("Отправка данных посетителя...")},complete:function(){$(this).parent().siblings(".solution-status").html("Обработка данных...")},step:function(t,e){$(this).parent().siblings(".percent").html(Math.round(t)+"%")}}).animate({width:"65%"},{duration:3e3,complete:function(){$(this).parent().siblings(".solution-status").html("Анализ полученных результатов...")},step:function(t,e){$(this).parent().siblings(".percent").html(Math.round(t)+"%")}}).animate({width:"99%"},{easing:"linear",duration:2e3,complete:function(){if(0==t.status)var e='<td>–</td><td>–</td><td class="active">–</td><td class="active">–</td><td class="denied">отказ в '+t.total_banks+" банках</td>";else var e="<td>"+String(t.payment_wod).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1&thinsp;")+"&thinsp;р/мес</td><td>"+String(t.max_sum_wod).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1&thinsp;")+'&thinsp;р</td><td class="active">'+String(t.payment_wd).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1&thinsp;")+'&thinsp;р/мес</td><td class="active">'+String(t.max_sum_wd).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1&thinsp;")+'&thinsp;р</td><td class="approved">одобрен в '+t.appr_banks+" из "+t.total_banks+" банках</td>";e=$(e);var n=$(this).closest("tr");n.find(".colspan").hide().remove(),e.appendTo(n).hide().fadeIn("slow"),a()},step:function(t,e){$(this).parent().siblings(".percent").html(Math.round(t)+"%")}})}),$("#online-air table tbody tr").length>10&&$("#online-air table tbody tr").last().remove()}).error(function(){console.log("Ошибка загрузки JSON")})}var d=!1;$("#client-period, #client-delay, #credit-goal").fancySelect(),$("#client-phone").mask("+7 (999) 999-99-99"),$("#client-birthday").datetimepicker({timepicker:!1,format:"d.m.Y",lang:"ru",todayButton:!1,dayOfWeekStart:1,scrollInput:!1,yearStart:"1930",yearEnd:"1996",startDate:"01.01.1990",onSelectDate:function(t,e){e.change()}}),$(".form-input").focus(function(){$(this).removeClass("input-error")}),$(".btn-close").click(function(){$(this).closest(".overlay").fadeOut("fast"),$("#form input[type='text']").each(function(){$(this).val("")}),$("#form select").each(function(){$(this).children("option").first().attr("selected",""),$(this).change(),$(this).siblings("ul.options").children("li").removeClass("selected"),$(this).siblings("ul.options").children("li").first().addClass("selected")})}),$("#request-send").click(function(){if(!d){var t=!1;if($(".form-input").each(function(){0==$(this).val().length&&($(this).addClass("input-error"),t=!0)}),!t){_gaq.push(["_trackEvent","Order","registration"]),yaCounter22812691.reachGoal("order"),dataLayer.push({event:"order"});var n={credit_sum:$("#credit-sum").val(),name:$("#client-name").val(),age:$("#client-birthday").val(),credit_period:$("#client-period").val(),delay:$("#client-delay").val(),credit_goal:$("#credit-goal").val(),phone:$("#client-phone").val(),formname:$("#inp-formname").val(),id_source:$("#inp-idsource").val()};e(n),$("#result-form").fadeIn("fast"),setTimeout(function(){$("#result-form .btn-close").click()},3500),d=!0}}}),$("#credit-sum").keydown(function(t){t.keyCode>=48&&t.keyCode<=57||t.keyCode>=96&&t.keyCode<=105||8==t.keyCode||9==t.keyCode||46==t.keyCode||35==t.keyCode||36==t.keyCode||37==t.keyCode||39==t.keyCode||(t.keyCode=0,t.preventDefault())}),$("#credit-sum").keyup(function(e){$(this).val(t($(this).val()))});for(var s=2;12>s;s++)i(s);$("#online-air table tbody tr td.time").each(function(t,e){var n=$(this).attr("data-timestamp");$(this).attr("data-timestamp",n-5700*t)}),n(),setTimeout(function(){a(!0)},2e3),setInterval(function(){n()},1e3)});