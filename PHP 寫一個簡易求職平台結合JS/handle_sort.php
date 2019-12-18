<?php
     // 1. 設定回傳傳輸格式
     header('Content_Type: application/json; charset=utf-8');
     // 2. 確認是否要抓到 sortby
     $sortby = $_GET['sortby'];
     // 3. require conn_db.php
    //  require_once('conn_db.php');
    require_once('test_pgdb.php');
     // 4. 寫sql  $sql = "SELECT * FROM jobs ORDER BY create_at DESC";
     $sql = "SELECT * FROM jobs ORDER BY $sortby";
    //  echo json_encode($sql);
    // 5. 放入query
    $res_arr = array();
    
    if($conn->query($sql)){
        $result = $conn -> query($sql);
        if ($result->rowCount() > 0){
            $res_arr = array('status'=>'success',
                             'data'=>array(),
                             'message'=>'拿取資料成功'
            );
            while ($row = $result->fetchObject()){
                array_push($res_arr['data'],array('title'=>$row->title,
                                          'descri'=>$row->descri,
                                          'salary'=>$row->salary,
                                          'link'=>$row->link,
                                          'create_at'=>$row->create_at,
                                          'due_date'=>$row->due_date,
                                          'update_date'=>$row->update_date

                ));
            }
            echo json_encode($res_arr);             
        }else{
            array_push($res_arr,array('status'=>'no-value',
                                      'message'=>'沒有拿到任何資料'
            ));
            echo json_encode($res_arr);
        }
    }else{
        array_push($res_arr,array('status'=>'fail',
                                  'message'=>'SQL錯誤'
        ));
        echo json_encode($res_arr);
    }    
?>