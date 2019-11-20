## observable

### forkJoin

用forkJoin合并的流，会在每个被合并的流都发出结束信号时发射一次也是唯一一次数据。假设我们有两个流：

```javascript

const ob1 = Rx.Observable.interval(1000).map(d => `ob1:${d}`).take(3);
const ob2 = Rx.Observable.interval(2000).map(d => `ob2:${d}`).take(2);

Rx.Observable.forkJoin(ob1, ob2).subscribe((data) => console.log(data));
// ["ob1:2", "ob2:1"]

```

ob1会在发射完第三个数据时停止发射，ob2会在发射完第二个数据时停止，而forkJoin合并后的流会等到ob1和ob2都结束时，发射一次数据，也就是触发一次subscribe里的回调，接收到的数据为ob1和ob2发射的最后一次数据的数组。


### Zip

zip工作原理如下，当每个传入zip的流都发射完毕第一次数据时，zip将这些数据合并为数组并发射出去；当这些流都发射完第二次数据时，zip再次将它们合并为数组并发射。以此类推直到其中某个流发出结束信号，整个被合并后的流结束，不再发射数据。

```javascript

const ob1 = Rx.Observable.interval(1000).map(d => `ob1:${d}`).take(3);
const ob2 = Rx.Observable.interval(2000).map(d => `ob2:${d}`).take(2);

Rx.Observable.zip(ob1, ob2).subscribe({
  next: (data) => console.log(data),
  complete: () => console.log('complete')
});
// ["ob1:0", "ob2:0"] ob1等待ob2发射数据，之后合并
// ["ob1:1", "ob2:1"] 此时ob2结束，整个合并的流也结束
// "complete"

```

zip和forkJoin的区别在于，forkJoin仅会合并各个子流最后发射的一次数据，触发一次回调；zip会等待每个子流都发射完一次数据然后合并发射，之后继续等待，直到其中某个流结束（因为此时不能使合并的数据包含每个子流的数据）

## Subject

RxJS Subject是一种特殊类型的Observable，允许将值多播到多个观察者Observer。虽然普通的Observable是单播的（每个订阅的Observer都拥有Observable的独立执行），但Subject是多播的。

Subject类似于Observable，但可以多播到许多观察者。Subject就像EventEmitters

```
var subject = new Rx.Subject();

subject.subscribe({
    next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
    next: (v) => console.log('observerB: ' + v)
})

subject.next(1);
subject.next(2);

// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```

## operators

### debounceTime

防抖：

`debounceTime(dueTime: number, scheduler: Scheduler): Observable`

只有在指定的时间间隔内没有产生另外的数据的时候，之前产生的数据才能被observable发射出来。marble diagram如下所示

a产生出来20ms后没有产生别的数据，订阅者可以得到a。b产生出来20ms内产生了新的数据c，b被忽略。c产生之后20ms内没有产生新数据，订阅者可以得到c

### debounce

`debounce(durationSelector: function): Observable`

和debounceTime相比，observable A产生数据经过debounce处理后，产生的数据能否被订阅到，由另外一个observable B决定

不断的点击红色的div，订阅者拿不到数据，点击一下蓝色的div，订阅者才能拿到数据。点击蓝色div这个事件被封装成了一个observable，他就像是一个开关一样，点一下就打开，不过只能有之前最近的时间内产生的那个数据才能通过

### throttleTime

`throttleTime(duration: number, scheduler: Scheduler): Observable`

节流：

发射第一个数据出来之后，之后发射的频率受duration影响，每次发射之后的duration时间之内不会发射出来新的数据。

### throttle

`throttle(durationSelector: function(value): Observable | Promise): Observable`

接收一个返回Observable的方法，可以传入interval，timer等。
throttle 预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期。

以某个时间间隔为阈值，在 durationSelector 完成前将抑制新值的发出
