<!-- @format -->
<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-info">
        <img class="footer-logo" src="@/assets/img/navbar/logo.svg" />
        <p class="paragraph-1">
          هلیوم بستری برای اسراک گزاری ایده ها و افراد پیشرو در زمینه علم و دانش
          است . در هلیوم میتوانید به جدید ترین مقالات علمی در کشور دسترسی داشته
          باشید و خود نیز در ترویج علم ودانش نقشی داشته باشید.
        </p>
      </div>
      <div class="footer-links">
        <ul class="footer-links__items">
          <li class="footer-links__item heading-2">
            <base-button kind="link" to="/article/write">بنویسید</base-button>
          </li>
          <li class="footer-links__item heading-2">
            <base-button kind="link">راهنما</base-button>
          </li>
          <li class="footer-links__item heading-2">
            <base-button kind="link">معرفی به دوستان</base-button>
          </li>
          <li class="footer-links__item heading-2">
            <base-button kind="link">قوانین</base-button>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/layout/_theFooter.scss";
</style>
