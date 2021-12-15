export const adjustTime=(hrs,mins,arr,date,zoneTime)=>{
    // console.log(arr);
    // setAudioSlot(arr)
        if(arr.length ==1){
      arr[0].alarmTimeP=hrs+":"+mins;arr[0].zoneP=zoneTime;
      let minsss =Number(new Date(date).getMinutes())
      arr[0].alarmtimeA=new Date(date).getHours().toString()+":"+(minsss <10 ? "0"+minsss:minsss);
      arr[0].mins=mins
      
    }
    else if(arr.length > 1){
        arr[0].alarmTimeP=hrs+":"+mins;arr[0].zoneP=zoneTime;
      let minsss =Number(new Date(date).getMinutes())
      arr[0].alarmtimeA=new Date(date).getHours().toString()+":"+(minsss <10 ? "0"+minsss:minsss);
      arr[0].mins=mins
      // arr[0].alarmTimeP=hrs+mins;arr[0].zoneP=zoneTime;arr[0].alarmtimeA=new Date(date).getHours()+new Date(date).getMinutes();
      for(var i=1;i<arr.length;i++){
        // console.log(Number(arr[i].mins),"hello ",Number(arr[i-1].mins))
        let minss = (Number(arr[i].mins)+(Number(arr[i-1].alarmtimeA.slice(3))))
        arr[i].alarmTimeP=hrs+":"+(minss < 10 ? "0"+minss:minss);
        arr[i].zoneP=zoneTime;
        arr[i].alarmtimeA=new Date(date).getHours().toString()+":"+(minss < 10 ? "0"+minss:minss);
      }
    }
    console.log(arr,'arrarrarr')
    return arr
      }