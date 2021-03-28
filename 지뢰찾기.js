var tbody = document.querySelector('#table tbody');
var dataset = [];
document.querySelector('#exec').addEventListener('click', function () {
    tbody.innerHTML = '';   // tbody의 내부를 모두 지우는 역할(= 내부 먼저 초기화)
    var col = parseInt(document.querySelector('#hor').value);
    var row = parseInt(document.querySelector('#ver').value);
    var mineCount = parseInt(document.querySelector('#mine').value);

    // 지뢰위치 뽑기
    var mine = Array(row * col).fill()
        .map(function (element, index) {
            return index;
        });
    var bumb = [];
    while (mine.length > 80) {
        var moveValue = mine.splice(Math.floor(Math.random() * mine.length), 1)[0];
        bumb.push(moveValue);
    }

    // 지뢰테이블 만들기
    for (var i = 0; i < row; i += 1) {
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for (var j = 0; j < col; j += 1) {
            arr.push(0);
            var td = document.createElement('td');
            // td를 선언해주자마다 eventListner실행을 해준다.
            // 해당 함수 밖에서 실행해주게 되면 변수td선언보다 리스너 실행이 먼저되므로
            // 리스너가 빈 배열이 된다.
            td.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                var parentTr = e.currentTarget.parentNode; // contextmenu가 발생하는 태그
                var parentTbody = e.currentTarget.parentNode.parentNode;
                // 오른쪽 클릭시 해당 칸의 위치를 알아내기 위해
                // Array.prototype은 배열이 아닌 유사배열의 위치를 알아내기 위할때 사용
                var blank = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var line = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.textContent = '!';
                } else if (e.currentTarget.textContent === '!') {
                    e.currentTarget.textContent = '?';
                } else if (e.currentTarget.textContent === '?') {
                    if (dataset[line][blank] === 0) {
                        e.currentTarget.textContent = '';
                    } else if (dataset[line][blank] === 'X') {
                        e.currentTarget.textContent = 'X';
                    }
                }
            });
            td.addEventListener('click', function (e) {
                var parentTr = e.currentTarget.parentNode; // contextmenu가 발생하는 태그
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var blank = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var line = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                if (dataset[line][blank] === 'X') {
                    e.currentTarget.textContent = '펑';
                } else {
                    var around = [
                        dataset[line][blank - 1], dataset[line][blank + 1],
                    ];
                    // 각각 if문의 문법은 다르지만 같은 역할은 한다. 각각의 역할은 따로 공부해보자
                    if (dataset[line - 1]) {
                        around.push(dataset[line - 1][blank - 1]);
                        around.push(dataset[line - 1][blank]);
                        around.push(dataset[line - 1][blank + 1]);
                    }
                    if (dataset[line + 1]) {
                        around = around.concat(
                            dataset[line + 1][blank - 1], dataset[line + 1][blank], dataset[line + 1][blank + 1]);
                    }
                    e.currentTarget.textContent = around.filter(function (v) { // fileter함수 -> 배열에서 필터링해줌
                        return v === 'X';
                    }).length;
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // 지뢰심기기
    for (var k = 0; k < bumb.length; k += 1) { // 예 60 -> 7번째줄 0번째칸
        var bumbRow = Math.floor(bumb[k] / 10);   // 예 6(=실제로는 7번째 줄)
        var bumbCol = bumb[k] % 10; // 예 0(=실제로는 0번째 칸)

        // tbody의 자식태그에 접근가능(처음children은 tr 두번째 children은 td)
        tbody.children[bumbRow].children[bumbCol].textContent = 'X'; // 화면
        dataset[bumbRow][bumbCol] = 'X'; // 따로 관리하는 2차원배열
    }
});

/* e.targer과 e.currenttarget의 차이점
e.targer -> td(이벤트가 실제로 일어나는곳)
e.currenttarger -> eventListener을 단 대상
따라서 eventListener을 단 대상과 실제로 eventListener가 발생하는곳이 다를 수 있음
 */


