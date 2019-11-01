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