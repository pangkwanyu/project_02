$(function () {
    go('广州');

    $('#ipt').on('keyup',function(){
        var city = $(this).val().trim();
        go(city);
    })


    function go(a) {

        $.ajax({
            type: 'GET',
            url: 'http://wthrcdn.etouch.cn/weather_mini',
            data: {
                city: a,
            },
            success: function (res) {
                //转换为对象
                var res = JSON.parse(res);

                if (res.status != 1000) { return; };
                
                let rdf = res.data.forecast;

                // console.log(res);
                $('.jintian .p1').html(res.data.city);
                $('.jintian .p2').html(rdf[0].date);

                var xingqi = {};

                function xing (i,v) {
                    xingqi.day[i] = {v};
                    xingqi.day[i].high = {v};
                }


                $.each(rdf, function (index, value) {
                    // console.log(value.date);
                    xingqi[index]=[index];
                    xingqi[index].day = value.date.split('日')[0];
                    xingqi[index].high = value.high.split(' ');
                    xingqi[index].low = value.low.split(' ');
                    xingqi[index].type = value.type;
                    xingqi[index].fengxiang = value.fengxiang;
                    xingqi[index].fengli = value.fengli.replace('<![CDATA[','').replace(']]>','');


                })
                // console.log(xingqi);

                var htmlStr = template('weather', xingqi);
                $('.riqi').empty().html(htmlStr);
                

                var htmlStr2 = template('tinkong',xingqi);
                $('.tianqi').empty().html(htmlStr2);

                $('.riqi #d0').html('今天');
            }
        })
    }

})