
function fixeddata() {
    //Fixed table values
    var fixedtable = new Array(4);

    for (var i = 0; i < fixedtable.length; i++) {
        fixedtable[i] = new Array(13);
    }
    //0 -> 13x input
    //1 -> Quality
    //2 -> Time
    //3 -> Cost
    fixedtable[0][0] = 8.67;
    fixedtable[0][1] = 8.21;
    fixedtable[0][2] = 8.15;
    fixedtable[0][3] = 8.02;
    fixedtable[0][4] = 7.63;
    fixedtable[0][5] = 8.02;
    fixedtable[0][6] = 7.63;
    fixedtable[0][7] = 8.02;
    fixedtable[0][8] = 8.15;
    fixedtable[0][9] = 7.70;
    fixedtable[0][10] = 6.73;
    fixedtable[0][11] = 6.53;
    fixedtable[0][12] = 6.53;
    fixedtable[1][0] = 0.91;
    fixedtable[1][1] = 0.88;
    fixedtable[1][2] = 0.85;
    fixedtable[1][3] = 0.83;
    fixedtable[1][4] = 0.81;
    fixedtable[1][5] = 0.81;
    fixedtable[1][6] = 0.81;
    fixedtable[1][7] = 0.80;
    fixedtable[1][8] = 0.79;
    fixedtable[1][9] = 0.79;
    fixedtable[1][10] = 0.69;
    fixedtable[1][11] = 0.68;
    fixedtable[1][12] = 0.67;
    fixedtable[2][0] = 0.88;
    fixedtable[2][1] = 0.84;
    fixedtable[2][2] = 0.81;
    fixedtable[2][3] = 0.83;
    fixedtable[2][4] = 0.79;
    fixedtable[2][5] = 0.86;
    fixedtable[2][6] = 0.76;
    fixedtable[2][7] = 0.80;
    fixedtable[2][8] = 0.65;
    fixedtable[2][9] = 0.81;
    fixedtable[2][10] = 0.66;
    fixedtable[2][11] = 0.68;
    fixedtable[2][12] = 0.74;
    fixedtable[3][0] = 0.80;
    fixedtable[3][1] = 0.81;
    fixedtable[3][2] = 0.81;
    fixedtable[3][3] = 0.76;
    fixedtable[3][4] = 0.75;
    fixedtable[3][5] = 0.81;
    fixedtable[3][6] = 0.73;
    fixedtable[3][7] = 0.71;
    fixedtable[3][8] = 0.64;
    fixedtable[3][9] = 0.73;
    fixedtable[3][10] = 0.57;
    fixedtable[3][11] = 0.61;
    fixedtable[3][12] = 0.63;

    return fixedtable;
}
function selectioncriterasarray() {
    var selectioncriteras = new Array(13);
    selectioncriteras[0] = "Technical Experience";
    selectioncriteras[1] = "Design quality";
    selectioncriteras[2] = "Staff Quality";
    selectioncriteras[3] = "Past Performance";
    selectioncriteras[4] = "Key Designer";
    selectioncriteras[5] = "Design Service Time";
    selectioncriteras[6] = "Construction estimation quality";
    selectioncriteras[7] = "Project Engagement";
    selectioncriteras[8] = "Bid Quality";
    selectioncriteras[9] = "Project Context";
    selectioncriteras[10] = "Number of years in business";
    selectioncriteras[11] = "Specialty designing services";
    selectioncriteras[12] = "Current Workload";

    return selectioncriteras;
}
function changeselectioncriterainputs(div2,cnt,selectioncriteras) {
    div2.empty();
    var x = '<table> <tr> <th>Selection Criteria</th>'
    for (var i = 1; i <= cnt; i++) {
        x+='<th>' + $('#consultant' + i).val() + '</th>'
    }
    x+='</tr>'
    for (var i = 1; i <= 13; i++) {
        x+='<tr><td>' + selectioncriteras[i - 1] + '</td>'
        for (var j = 1; j <= cnt; j++) {
            x+='<td><input type="text" id="value' + i + j + '"></td>'
        }
        x+='</tr>'
    }
    x+='</table>'
    div2.html(x);
}
function calculateMaxPrequalificationScore(fixedtable,quality,time,cost){
    var result = 0;
    for(var j=0;j<13;j++){
        result = result + (fixedtable[0][j]*fixedtable[1][j]*quality)
        result = result + (fixedtable[0][j]*fixedtable[2][j]*time)
        result = result + (fixedtable[0][j]*fixedtable[3][j]*cost)
    }
    return result.toFixed(2);
}
function getPrequalificationScore(fixedtable,quality,time,cost,selectionCriteriaValues){
    var result = 0;
    for(var j=0;j<13;j++){
        result = result + (fixedtable[0][j]*fixedtable[1][j]*quality*selectionCriteriaValues[j]);
        result = result + (fixedtable[0][j]*fixedtable[2][j]*time*selectionCriteriaValues[j]);
        result = result + (fixedtable[0][j]*fixedtable[3][j]*cost*selectionCriteriaValues[j]);
    }
    return result.toFixed(2);
}

$(document).ready(function () {

    var fixedtable = fixeddata();
    var selectioncriteras = selectioncriterasarray();

    var numofoffices = $('#numofoffices');
    var div1 = $('.consultantnames');
    var div2 = $('.selectioncriteria');
    var div3 = $('.output');

    var MaxPrequalificationScore;

    $('.constraints').hide();

    $('#numofoffices').change(function () {
        $('.constraints').show();
        var cnt = numofoffices.val();

        div1.empty();
        for (var i = 1; i <= cnt; i++)
            div1.append($('<label for="consultant' + i + '">Please, enter the name of consultant' + i + ':</label><input type="text" id="consultant' + i + '" name="consultant' + i + '"><br><br></br>'));

        changeselectioncriterainputs(div2,cnt,selectioncriteras);
    });

    $('.consultantnames').change(function () {
        var cnt = numofoffices.val();
        changeselectioncriterainputs(div2,cnt,selectioncriteras);
    });

    $('.constraints').change(function(){
        var quality = $('#Quality').val();
        var time = $('#Time').val();
        var cost = $('#Cost').val();
        if(quality!='' && time!='' && cost!=''){
            MaxPrequalificationScore = calculateMaxPrequalificationScore(fixedtable,quality,time,cost);
        }
    });


    $('#submit').click(function(){
        var cnt = numofoffices.val();
        var PrequalificationScore = new Array(cnt);
        var quality = $('#Quality').val();
        var time = $('#Time').val();
        var cost = $('#Cost').val();

        if(quality!='' && time!='' && cost!=''){
            for(var i=1;i<=cnt;i++){
                var selectionCriteriaValues = new Array(13);
                for(var j=1;j<=13;j++){
                    selectionCriteriaValues[j-1] = $('#value'+j+i).val();
                }
                PrequalificationScore[i-1] = [getPrequalificationScore(fixedtable,quality,time,cost,selectionCriteriaValues),i-1]; 
            }
        
            PrequalificationScore.sort((a,b)=>b[0]-a[0]);

            div3.empty();
            var p = '<table> <tr> <th>Rank</th> <th>Consultant</th> <th>PS</th> <th>CPI</th></tr>';
            for(var i=1;i<=cnt;i++){
                var y = PrequalificationScore[i-1][1]+1;
                var x = $('#consultant' + y).val()
                p+='<tr> <td>'+i+'</td> <td>'+x+'</td> <td>'+PrequalificationScore[i-1][0]+'</td> <td>'+(PrequalificationScore[i-1][0]/MaxPrequalificationScore).toFixed(2)+'</td> </tr>'
            }
            p+='<tr><td></td><td>Max PS</td><td>'+MaxPrequalificationScore+'</td><td></td></tr></table>'
            div3.html(p);
        }
    });

});