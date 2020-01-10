<template>
  <div class="skeleton-container">
    <div class="skeleton-animation"></div>
    <div class="skeleton-item skeleton-item-1"></div>
    <div class="skeleton-item skeleton-item-2"></div>
    <div class="skeleton-container-2">
      <div class="skeleton-item-3">
        <div class="skeleton-item skeleton-item-4"></div>
        <div class="skeleton-item skeleton-item-5"></div>
      </div>
      <div class="skeleton-item-3">
        <div class="skeleton-item skeleton-item-4"></div>
        <div class="skeleton-item skeleton-item-5"></div>
      </div>
      <div class="skeleton-item-3">
        <div class="skeleton-item skeleton-item-4"></div>
        <div class="skeleton-item skeleton-item-5"></div>
      </div>
      <div class="skeleton-item-3">
        <div class="skeleton-item skeleton-item-4"></div>
        <div class="skeleton-item skeleton-item-5"></div>
      </div>
      <div class="skeleton-item-3">
        <div class="skeleton-item skeleton-item-4"></div>
        <div class="skeleton-item skeleton-item-5"></div>
      </div>
    </div>
    <div class="skeleton-container-2">
      <div class="skeleton-item-3">
        <div class="skeleton-item skeleton-item-4"></div>
        <div class="skeleton-item skeleton-item-5"></div>
      </div>
      <div class="skeleton-item-3">
        <div class="skeleton-item skeleton-item-4"></div>
        <div class="skeleton-item skeleton-item-5"></div>
      </div>
      <div class="skeleton-item-3">
        <div class="skeleton-item skeleton-item-4"></div>
        <div class="skeleton-item skeleton-item-5"></div>
      </div>
      <div class="skeleton-item-3">
        <div class="skeleton-item skeleton-item-4"></div>
        <div class="skeleton-item skeleton-item-5"></div>
      </div>
      <div class="skeleton-item-3">
        <div class="skeleton-item skeleton-item-4"></div>
        <div class="skeleton-item skeleton-item-5"></div>
      </div>
    </div>
    <div class="skeleton-item skeleton-item-6"></div>
    <div class="skeleton-item skeleton-item-7"></div>
  </div>
</template>
<style>
@keyframes backpos {
  from {
    background-position-x: -200px;
  }
  to {
    background-position-x: calc(200px + 100%);
  }
}
.skeleton-container {
  padding: 10px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fff;
}
.skeleton-animation {
  position: absolute;
  z-index: auto;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80%);
  background-size: 30% 100%;
  background-repeat: no-repeat;
  -webkit-animation: backpos 0.9s ease-in-out 0s infinite;
  animation: backpos 0.9s ease-in-out 0s infinite;
}
.skeleton-item {
  background-color: #efefef;
}
.skeleton-item-1 {
  height: 32px;
  border-radius: 18px;
}
.skeleton-item-2 {
  height: 144px;
  margin-top: 14px;
  border-radius: 20px 4px 20px 4px;
}
.skeleton-container-2 {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.skeleton-item-3 {
  flex-basis: 45px;
}
.skeleton-item-4 {
  height: 45px;
}
.skeleton-item-5 {
  margin-top: 7px;
  height: 13px;
}
.skeleton-item-6 {
  margin-top: 20px;
  width: 300px;
  height: 19px;
}
.skeleton-item-7 {
  margin-top: 15px;
  border-radius: 6px;
  height: 100px;
}
</style>
