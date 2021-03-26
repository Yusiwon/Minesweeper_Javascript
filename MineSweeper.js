var size = 10;  // 게임의 가로와 세로의 크기를 정해준다.
var bumb_count = 10;    // 폭탄갯수

var game_arr = new Array(size);

// 배열의 공간생성(기본으로 모두 0으로 초기화)
for (var i = 0; i < game_arr.length; i++) {
    game_arr[i] = new Array(size);
    for (var j = 0; j < game_arr[i].length; j++) {
        game_arr[i][j] = 0;
    }
}

/* 폭탄을 넣어주는 작업
    random을 통해 임의의 좌표에 폭판을 넣어준다.
    만약 임의의 좌표 x, y에 이미 폭탄이 있다면 x, y를 다시 뽑아야한다.
    -> 재귀호출로 호출한다.
 */
function setBomb(count, callback) {

    // 모든 칸에 폭탄이 있는 경우가 최대의 폭탄 갯수
    //게임판 개수보다 폭탄 개수가 맣으면 재귀호출에서 무한루프가 돌게된다.
    if (size * size < bumb_count) {
        callback({cade: "0000", msg: "BUMB_COUNT ERROR!"});
        return;
    }

    var x = parseInt(Math.random() * 10); // 0~9
    var y = parseInt(Math.random() * 10); // 0~9

    if (game_arr[x][y] != '*') {
        game_arr[x][y] = "*";
        count++;

        // 목표했던 폭탄개수만큼 설치가 끝난 경우
        if (count == bumb_count) {
            callback({code: 1000});
        }
    }
    setBomb(count, callback);
}

for (var i = 0 ; i < game_arr.length; i++) {
    for (var j = 0; j < game_arr.length; j++) {
        if (game_arr[i][j] == "*") {
            setBumbCount(i, j);
        }
    }
}

function setBumbCount(i, j) {

    for (var x = i - 1; x <= i + 1; i++) {
        for (var y = j - 1; j <= j + 1; j++) {

            if (0 <= x && x < size && 0 <= y && y < size && game_arr[x][y] != "*") {
                game_arr[x][y]++;
            }
        }
    }
}