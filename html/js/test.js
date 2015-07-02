$(document).ready(function () {
    function t(e) {
        return e.replace(/(\s)+/g, "").replace(/(\d{1,3})(?=(?:\d{3})+$)/g, "$1 ")
    }
    function n(e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e
    }
    function r(e) {
        var t = new Date(parseInt(e));
        var n = t.getDate();
        var r = t.getMonth() + 1;
        var i = t.getFullYear();
        n = n < 10 ? "0" + n : n;
        r = r < 10 ? "0" + r : r;
        return n + "." + r + "." + i
    }
    function i(e) {
        $.post("scoring.php/?command=api-addRequest", e)
    }
    function s() {
        $("#online-air table tbody tr td.time").each(function () {
            var e = (new Date).getTime();
            var t = Math.floor((e - $(this).attr("data-timestamp")) / 1e3);
            var n = Math.floor(t / 3600);
            var r = Math.floor(t % 3600 / 60);
            var i = t % 60;
            var s = n > 0 ? n + " ч " : "";
            s += r > 0 ? r + " мин " : "";
            s += i + " сек назад";
            $(this).html(s)
        })
    }
    function o(e) {
        $.ajax({
            url: "scoring.php/?command=getResult",
            dataType: "json",
            async: false,
            success: function (t) {
                var n = (new Date).getTime();
                var r = n - e * 3e3;
                var i = "<tr>" + '<td class="time" data-timestamp="' + r + '">' + e * 3 + " сек назад</td>" + '<td class="number">№' + t.number + "</td>" + '<td class="sum">' + String(t.sum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1&thinsp;") + "&thinsp;р</td>";
                if (t.status == 0) {
                    i += "<td>–</td>" + "<td>–</td>" + '<td class="active">–</td>' + '<td class="active">–</td>' + '<td class="denied">отказ в ' + t.total_banks + " банках</td>"
                } else {
                    i += "<td>" + String(t.payment_wod).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1&thinsp;") + "&thinsp;р/мес" + "</td>" + "<td>" + String(t.max_sum_wod).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1&thinsp;") + "&thinsp;р" + "</td>" + '<td class="active">' + String(t.payment_wd).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1&thinsp;") + "&thinsp;р/мес" + "</td>" + '<td class="active">' + String(t.max_sum_wd).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1&thinsp;") + "&thinsp;р" + "</td>" + '<td class="approved">одобрен в ' + t.appr_banks + " из " + t.total_banks + " банках</td>"
                }
                i += "</tr>";
                i = $(i);
                i.appendTo("#online-air table tbody")
            },
            error: function () {
                console.log("Ошибка загрузки JSON")
            }
        })
    }
    function u() {
        $.getJSON("scoring.php/?command=getResult", function (e) {
            var t = $("<tr>" + '<td class="time">0 сек назад</td>' + '<td class="number"></td>' + '<td class="sum"></td>' + '<td colspan="5" class="colspan">' + '<div class="solution-status">Отправка данных посетителя...</div>' + '<div class="percent">0%</div>' + '<div class="mini-progress-wrap">' + '<div class="mini-progress"></div>' + "</div>" + '<div class="clearfix"></div>' + "</td>" + "</tr>");
            var n = (new Date).getTime();
            t.find(".time").attr("data-timestamp", n).html("0 сек назад");
            t.find(".number").html("№" + e.number);
            t.find(".sum").html(String(e.sum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1&thinsp;") + "&thinsp;р");
            t.prependTo("#online-air table tbody").hide().fadeIn("slow", function () {
                t.find(".mini-progress").stop().animate({
                    width: "30%"
                }, {
                    duration: 2500,
                    start: function () {
                        $(this).parent().siblings(".solution-status").html("Отправка данных посетителя...")
                    },
                    complete: function () {
                        $(this).parent().siblings(".solution-status").html("Обработка данных...")
                    },
                    step: function (e, t) {
                        $(this).parent().siblings(".percent").html(Math.round(e) + "%")
                    }
                }).animate({
                        width: "65%"
                    }, {
                        duration: 3e3,
                        complete: function () {
                            $(this).parent().siblings(".solution-status").html("Анализ полученных результатов...")
                        },
                        step: function (e, t) {
                            $(this).parent().siblings(".percent").html(Math.round(e) + "%")
                        }
                    }).animate({
                        width: "99%"
                    }, {
                        easing: "linear",
                        duration: 2e3,
                        complete: function () {
                            if (e.status == 0) {
                                var t = "<td>–</td>" + "<td>–</td>" + '<td class="active">–</td>' + '<td class="active">–</td>' + '<td class="denied">отказ в ' + e.total_banks + " банках</td>"
                            } else {
                                var t = "<td>" + String(e.payment_wod).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1&thinsp;") + "&thinsp;р/мес" + "</td>" + "<td>" + String(e.max_sum_wod).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1&thinsp;") + "&thinsp;р" + "</td>" + '<td class="active">' + String(e.payment_wd).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1&thinsp;") + "&thinsp;р/мес" + "</td>" + '<td class="active">' + String(e.max_sum_wd).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1&thinsp;") + "&thinsp;р" + "</td>" + '<td class="approved">одобрен в ' + e.appr_banks + " из " + e.total_banks + " банках</td>"
                            }
                            t = $(t);
                            var n = $(this).closest("tr");
                            n.find(".colspan").hide().remove();
                            t.appendTo(n).hide().fadeIn("slow");
                            u()
                        },
                        step: function (e, t) {
                            $(this).parent().siblings(".percent").html(Math.round(e) + "%")
                        }
                    })
            });
            if ($("#online-air table tbody tr").length > 10) {
                $("#online-air table tbody tr").last().remove()
            }
        }).error(function () {
                console.log("Ошибка загрузки JSON")
            })
    }
    var e = false;
    $("#client-period, #client-delay, #credit-goal").fancySelect();
    $("#client-phone").mask("+7 (999) 999-99-99");
    $("#client-birthday").datetimepicker({
        timepicker: false,
        format: "d.m.Y",
        lang: "ru",
        todayButton: false,
        dayOfWeekStart: 1,
        scrollInput: false,
        yearStart: "1930",
        yearEnd: "1996",
        startDate: "01.01.1990",
        onSelectDate: function (e, t) {
            t.change()
        }
    });
    $(".form-input").focus(function () {
        $(this).removeClass("input-error")
    });
    $(".btn-close").click(function () {
        $(this).closest(".overlay").fadeOut("fast");
        $("#form input[type='text']").each(function () {
            $(this).val("")
        });
        $("#form select").each(function () {
            $(this).children("option").first().attr("selected", "");
            $(this).change();
            $(this).siblings("ul.options").children("li").removeClass("selected");
            $(this).siblings("ul.options").children("li").first().addClass("selected")
        })
    });
    $("#request-send").click(function () {
        if (!e) {
            var t = false;
            $(".form-input").each(function () {
                if ($(this).val().length == 0) {
                    $(this).addClass("input-error");
                    t = true
                }
            });
            if (!t) {
                _gaq.push(["_trackEvent", "Order", "registration"]);
                yaCounter22812691.reachGoal("order");
                dataLayer.push({
                    event: "order"
                });
                var n = {
                    credit_sum: $("#credit-sum").val(),
                    name: $("#client-name").val(),
                    age: $("#client-birthday").val(),
                    credit_period: $("#client-period").val(),
                    delay: $("#client-delay").val(),
                    credit_goal: $("#credit-goal").val(),
                    phone: $("#client-phone").val(),
                    formname: $("#inp-formname").val(),
                    id_source: $("#inp-idsource").val()
                };
                i(n);
                $("#result-form").fadeIn("fast");
                setTimeout(function () {
                    $("#result-form .btn-close").click()
                }, 3500);
                e = true
            }
        }
    });
    $("#credit-sum").keydown(function (e) {
        if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 46 || e.keyCode == 35 || e.keyCode == 36 || e.keyCode == 37 || e.keyCode == 39)) {
            e.keyCode = 0;
            e.preventDefault()
        }
    });
    $("#credit-sum").keyup(function (e) {
        $(this).val(t($(this).val()))
    });
    for (var a = 2; a < 12; a++) {
        o(a)
    }

    $("#online-air table tbody tr td.time").each(function (e, t) {
        var n = $(this).attr("data-timestamp");
        $(this).attr("data-timestamp", n - e * 5700)
    });
    s();
    setTimeout(function () {
        u(true)
    }, 2e3);
    setInterval(function () {
        s()
    }, 1e3)
})