# complexity

<style type="text/css">
thead {
background : #928f8d;
color : #000;
}

tbody td:nth-child(1) {
background : #eee;
}

td {
text-align : center;
color : #000;
}

td.t_1 {
background : #00ff00;
}

td.t_2 {
background : #b3ff3a;
}

td.t_3 {
background : #fff50f;
}

td.t_4 {
background : #ff882b;
}

td.t_5 {
background : red;
}

td.white {
background : white;
}
</style>

<h1><a href="./index.html">back home</a></h1>
<br>
<h2>数据结构操作</h2>
<table width=”450″ border=”1″ cellspacing=”0″ cellpadding=”2″ bordercolor=”#009900″>
  <thead>
  <tr>
  <th>数据结构</th>
  <th colspan="8">时间复杂度</th>
  <th>空间复杂度</th>
  </tr>
  <tr>
  <th></th>
  <th colspan="4">平均</th>
  <th colspan="4">最差</th>
  <th>最差</th>
  </tr>
  <tr>
  <th></th>
  <th>访问</th>
  <th>搜索</th>
  <th>插入</th>
  <th>删除</th>
  <th>访问</th>
  <th>搜索</th>
  <th>插入</th>
  <th>删除</th>
  <th></th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Array_data_structure">array</a></td>
  <td class="t_1">O(1)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_1">O(1)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Stack_(abstract_data_type)">stack</a></td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td class="t_3">O(n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Linked_list#Singly_linked_lists">singly-linked list</a></td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td class="t_3">O(n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Doubly_linked_list">doubly-linked list</a></td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td class="t_3">O(n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Skip_list">skip list</a></td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_4">O(n log(n))</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Hash_table">hash table</a></td>
  <td>-</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td>-</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Binary_search_tree">binary search tree</a></td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Cartesian_tree">cartesian tree</a></td>
  <td>-</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td>-</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/B-tree">b-tree</a></td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_3">O(n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Red%E2%80%93black_tree">red-black tree</a></td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_3">O(n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Splay_tree">splay tree</a></td>
  <td>-</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td>-</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_3">O(n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/AVL_tree">avl tree</a></td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_3">O(n)</td>
  </tr>
  </tbody>
</table>

<h2>数组排序算法</h2>
<table width=”450″ border=”1″ cellspacing=”0″ cellpadding=”2″ bordercolor=”#009900″>
  <thead>
  <tr>
  <th>算法</th>
  <th colspan="3">时间复杂度</th>
  <th>空间复杂度</th>
  </tr>
  <tr>
  <th></th>
  <th>最佳</th>
  <th>平均</th>
  <th>最差</th>
  <th>最差</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Quicksort">quicksort</a></td>
  <td class="t_4">O(n log(n))</td>
  <td class="t_4">O(n log(n))</td>
  <td class="t_5">O(n^2)</td>
  <td class="t_2">O(log(n))</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Merge_sort">mergesort</a></td>
  <td class="t_4">O(n log(n))</td>
  <td class="t_4">O(n log(n))</td>
  <td class="t_4">O(n log(n))</td>
  <td class="t_3">O(n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Timsort">timsort</a></td>
  <td class="t_3">O(n)</td>
  <td class="t_4">O(n log(n))</td>
  <td class="t_4">O(n log(n))</td>
  <td class="t_3">O(n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Heapsort">heapsort</a></td>
  <td class="t_4">O(n log(n))</td>
  <td class="t_4">O(n log(n))</td>
  <td class="t_4">O(n log(n))</td>
  <td class="t_1">O(1)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Bubble_sort">bubblesort</a></td>
  <td class="t_3">O(n)</td>
  <td class="t_5">O(n^2)</td>
  <td class="t_5">O(n^2)</td>
  <td class="t_1">O(1)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Insertion_sort">insertionsort</a></td>
  <td class="t_3">O(n)</td>
  <td class="t_5">O(n^2)</td>
  <td class="t_5">O(n^2)</td>
  <td class="t_1">O(1)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Selection_sort">selectionsort</a></td>
  <td class="t_5">O(n^2)</td>
  <td class="t_5">O(n^2)</td>
  <td class="t_5">O(n^2)</td>
  <td class="t_1">O(1)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Shellsort">shellsort</a></td>
  <td class="t_3">O(n)</td>
  <td class="t_5">O((n log(n))^2)</td>
  <td class="t_5">O((n log(n))^2)</td>
  <td class="t_1">O(1)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Bucket_sort">bucketsort</a></td>
  <td class="t_3">O(n+k)</td>
  <td class="t_3">O(n+k)</td>
  <td class="t_5">O(n^2)</td>
  <td class="t_3">O(n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Radix_sort">radixsort</a></td>
  <td class="t_3">O(nk)</td>
  <td class="t_3">O(nk)</td>
  <td class="t_3">O(nk)</td>
  <td class="t_3">O(n+k)</td>
  </tr>
  </tbody>
</table>

<h2>图操作</h2>
<table width=”450″ border=”1″ cellspacing=”0″ cellpadding=”2″ bordercolor=”#009900″>
  <thead>
  <tr>
  <th>节点/边界管理</th>
  <th>存储</th>
  <th>增加顶点</th>
  <th>增加边界</th>
  <th>移除顶点</th>
  <th>移除边界</th>
  <th>查询</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Adjacency_list">adjacencylist</a></td>
  <td class="t_3">O(|V|+|E|)</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td class="t_3">O(|V|+|E|)</td>
  <td class="t_3">O(|E|)</td>
  <td class="t_3">O(|V|)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Adjacency_list">incidencelist</a></td>
  <td class="t_3">O(|V|+|E|)</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td class="t_3">O(|E|)</td>
  <td class="t_3">O(|E|)</td>
  <td class="t_3">O(|E|)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Adjacency_matrix">adjacencymatrix</a></td>
  <td class="t_5">O(|V|^2)</td>
  <td class="t_5">O(|V|^2)</td>
  <td class="t_1">O(1)</td>
  <td class="t_5">O(|V|^2)</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Incidence_matrix">incidencematrix</a></td>
  <td class="t_5">O(|V|*|E|)</td>
  <td class="t_5">O(|V|*|E|)</td>
  <td class="t_5">O(|V|*|E|)</td>
  <td class="t_5">O(|V|*|E|)</td>
  <td class="t_5">O(|V|*|E|)</td>
  <td class="t_3">O(|E|)</td>
  </tr>
  </tbody>
</table>

<h2>堆操作</h2>
<table width=”450″ border=”1″ cellspacing=”0″ cellpadding=”2″ bordercolor=”#009900″>
  <thead>
  <tr>
  <th>类型</th>
  <th colspan="7">时间复杂度</th>
  </tr>
  <tr>
  <th></th>
  <th>heapify</th>
  <th>查找最大值</th>
  <th>分离最大值</th>
  <th>提升键</th>
  <th>插入</th>
  <th>删除</th>
  <th>合并</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Linked_list">linkedlist (sorted)</a></td>
  <td>-</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_1">O(1)</td>
  <td class="t_3">O(n+m)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Linked_list">linkedlist (unsorted)</a></td>
  <td>-</td>
  <td class="t_3">O(n)</td>
  <td class="t_3">O(n)</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Binary_heap">binaryheap</a></td>
  <td class="t_3">O(n)</td>
  <td class="t_1">O(1)</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_5">O(m+n)</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Binomial_heap">binomialheap</a></td>
  <td>-</td>
  <td class="t_1">O(1)</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_1">O(1)</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_2">O(log(n))</td>
  </tr>
  <tr>
  <td><a href="https://en.wikipedia.org/wiki/Fibonacci_heap">fibonacciheap</a></td>
  <td>-</td>
  <td class="t_1">O(1)</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_1">O(1)</td>
  <td class="t_1">O(1)</td>
  <td class="t_2">O(log(n))</td>
  <td class="t_1">O(1)</td>
  </tr>
  </tbody>
</table>
