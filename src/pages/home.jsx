import { useEffect } from 'react';
import { useState } from 'react';

export function Home() {

    const box_info = [];
    let boxes_html = [];

    const [boxInfo, setBoxInfo] = useState([]);

    function init_boxes() {
        for (let i = 0; i < 900; i++) {
            box_info.push({
                id: i,
                color: 'sky-500',
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

        setBoxInfo(box_info);
    }

    function createShortestPath(){
        // Game ends when path reaches any box in the right corner
        let randomInteger = Math.floor(Math.random() * 3); // 0: up, 1: right, 2: down
        let current_position = 0;  // starting from first box so left top corner
        
    }

    function drawBoxes() {
        if (box_info.length === 0) {
            return
        }
        for (let i = 0; i < 900; i++) {
            let random_integer = Math.floor(Math.random() * 2);
            let has_corner = random_integer === 1 ? true : false;
            has_corner = false
            let horizontal = false;
            let vertical = false;
            let isTopBox = boxInfo[i].isTopBox;
            let isLeftBox = boxInfo[i].isLeftBox;
            let isRightBox = boxInfo[i].isRightBox;
            let isBottomBox = boxInfo[i].isBottomBox;
            boxes_html.push(
                <div className={`area w-full h-full bg-sky-500 ${has_corner && "border-r-4"} ${has_corner && "border-b-4"} flex items-center justify-center`}>
                    {horizontal && <div className="path_marker w-full h-1 bg-black"></div>}
                    {vertical && <div className="path_marker w-1 h-full bg-black"></div>}
                </div>
            );
        }
    }

    // init game
    useEffect(() => {
        init_boxes();
    }, []);


    // run with each render
    drawBoxes();


    return (
        <>
            <div className="page w-full h-screen bg-slate-200 flex items-center justify-center">
                <div className="main w-[1000px] h-[700px] bg-slate-700 relative">
                    <div className="grid grid-rows-25 grid-flow-col absolute w-full h-full">
                        {boxes_html}
                    </div>
                </div>
            </div>
        </>
    )
}