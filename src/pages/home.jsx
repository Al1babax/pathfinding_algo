import { useEffect, useState, useRef } from 'react';

export function Home() {

    const box_info = [];
    let boxes_html = [];

    const [boxInfo, setBoxInfo] = useState([]);
    const [shortestPathBoxes, setShortestPathBoxes] = useState([]);
    const [showSolution, setShowSolution] = useState(false);
    const renderCounter = useRef(0);

    function init_boxes() {
        setShowSolution(false);
        if (box_info.length !== 0) {
            return;
        }
        for (let i = 0; i < 900; i++) {
            box_info.push({
                id: i,
                color: 'bg-sky-500',
                isStart: false,
                isEnd: false,
                hasWallRight: false,
                hasWallBottom: false,
                isVisited: false,
                isShortestPath: false,
                distance: Infinity,
                previousNode: null,
                isTopBox: i % 25 === 0 ? true : false,
                isLeftBox: i < 25 ? true : false,
                isRightBox: i > 874 ? true : false,
                isBottomBox: i % 25 === 24 ? true : false,
            });
        }
        box_info[0].isStart = true;
        box_info[0].isVisited = true;
        box_info[0].isShortestPath = true;

        createShortestPath();
        drawWalls();
        setBoxInfo(box_info);

    }

    function drawWalls(){
        for(let i = 0; i < 900; i++){
            let randomInteger = Math.floor(Math.random() * 3); // 0: no wall, 1: wall right, 2: wall bottom
            if(randomInteger === 1 && !box_info[i].isShortestPath){
                box_info[i].hasWallRight = true;
            }
            if(randomInteger === 2 && !box_info[i].isShortestPath){
                box_info[i].hasWallBottom = true;
            }
        }
    }

    function createShortestPath() {
        // Game ends when path reaches any box in the right corner
        let randomInteger = Math.floor(Math.random() * 3); // 0: up, 1: right, 2: down
        let current_position = 0;  // starting from first box so left top corner
        let shortest_path_boxes = [];

        while (!box_info[current_position].isRightBox) {
            if (randomInteger === 0) {
                // move up
                if (!box_info[current_position].isTopBox && !box_info[current_position - 1].isShortestPath) {
                    box_info[current_position].isShortestPath = true;
                    shortest_path_boxes.push(current_position);
                    current_position -= 1;
                }
                else {
                    randomInteger = Math.floor(Math.random() * 3);
                    continue;
                }
            }
            else if (randomInteger === 1) {
                // move right
                if (!box_info[current_position].isRightBox && !box_info[current_position + 25].isShortestPath) {
                    box_info[current_position].isShortestPath = true;
                    shortest_path_boxes.push(current_position);
                    current_position += 25;
                }
                else {
                    randomInteger = Math.floor(Math.random() * 3);
                    continue;
                }
            }
            else if (randomInteger === 2) {
                // move down
                if (!box_info[current_position].isBottomBox && !box_info[current_position + 1].isShortestPath) {
                    box_info[current_position].isShortestPath = true;
                    shortest_path_boxes.push(current_position);
                    current_position += 1;
                }
                else {
                    randomInteger = Math.floor(Math.random() * 3);
                    continue;
                }
            }
            randomInteger = Math.floor(Math.random() * 3);
            box_info[current_position].isShortestPath = true;
            shortest_path_boxes.push(current_position);
            setShortestPathBoxes(shortest_path_boxes);

        }

    }

    function changeBoxColor(id) {
        if (box_info[id].isStart) {
            return;
        }
        if (box_info[id].isEnd) {
            return;
        }
        if (box_info[id].color === 'bg-sky-500') {
            box_info[id].color = 'bg-red-500';
        }
        else {
            box_info[id].color = 'bg-sky-500';
        }
        setBoxInfo(box_info);
    }

    function drawBoxes() {
        if (boxInfo.length === 0) {
            return
        }
        for (let i = 0; i < 900; i++) {
            boxes_html.push(
                <button className={`area w-full h-full bg-sky-500 ${boxInfo[i].hasWallRight && "border-r-4"} ${boxInfo[i].hasWallBottom && "border-b-4"} flex items-center justify-center relative`} onClick={() => changeBoxColor(i)}>
                    {true && boxInfo[i].isShortestPath && <div className={`path_marker w-5 h-5 text-center ${boxInfo[i].color}`}></div>}
                    {false && boxInfo[i].isShortestPath && <div className={`path_marker w-5 h-5 text-center bg-red-500`}></div>}
                </button>
            );
        }
    }

    function showPath(){
        //console.log(shortestPathBoxes)
        let temp_box_Info = [...boxInfo];
        for(let i = 0; i < shortestPathBoxes.length; i++){
            temp_box_Info[shortestPathBoxes[i]].color = showSolution ? 'bg-sky-500' : 'bg-red-500';
        }
        setBoxInfo(temp_box_Info);
        showSolution ? setShowSolution(false) : setShowSolution(true);
    }

    // init game
    useEffect(() => {
        init_boxes();
    }, []);



    // run with each render
    drawBoxes();
    renderCounter.current += 1;
    console.log(renderCounter);


    return (
        <>
            <div className="page w-full h-screen bg-slate-200 flex flex-col items-center justify-center">
                <div className="controls w-[1000px] h-[70px] bg-slate-300 flex gap-10 justify-center items-center">
                    <button className="btn h-10 bg-slate-400 rounded hover:brightness-110 px-2">Start</button>
                    <button className="btn h-10 bg-slate-400 rounded hover:brightness-110 px-2" onClick={init_boxes}>Reset</button>
                    <button className="btn h-10 bg-slate-400 rounded hover:brightness-110 px-2" onClick={showPath}>{showSolution ? "Hide" : "Show"} path</button>
                </div>
                <div className="main w-[1000px] h-[700px] bg-slate-700 relative">
                    <div className="grid grid-rows-25 grid-flow-col absolute w-full h-full">
                        {boxes_html}
                    </div>
                </div>
            </div>
        </>
    )
}