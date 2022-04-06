<template>
  <section class="map">
    <div class="container">
      <div class="map__rules">
        <h1 class="map__title">
          Правила игры
        </h1>

        <p class="map__text">
          Выполни все задания в каждой точке комбината,
          собирая по пути <b class="success-color">секретные слова</b> для кодовой фразы.
          Специальное окно для ее ввода откроется по мере прохождения игры.
          Прояви внимательность: если соберешь кодовую фразу, сможешь
          вернуться в свое настоящее и получить ценный подарок!
        </p>
      </div>
      <div class="map__questions">
        <div class="map__points">
          <span class="big">{{ getUser.points }}</span>
          <span class="small">/100 баллов</span>
        </div>

        <button class="map__btn map__btn--hr" @click="showHR" type="button">Отдел кадров</button>

        <button
          class="map__btn map__btn--digitization"
          @click="showDigitization"
          type="button"
        >Отдел цифровизации</button>

        <button
          class="map__btn map__btn--skills"
          @click="showQuiz"
          type="button"
        >Кто здесь профи</button>

        <button
          class="map__btn map__btn--video"
          @click="showVideo"
          type="button"
        >Видео о компании</button>

        <button
          class="map__btn map__btn--museum"
          @click="showMuseum"
          type="button"
        >Интерактивный <br> музей комбинатов</button>

        <button
          class="map__btn map__btn--calculator"
          @click="showCalculator"
          type="button"
        >Бухгалтерия</button>

        <button
          class="map__btn map__btn--bot"
          @click="showChatBot"
          type="button"
        >Заводская столовая</button>
      </div>
    </div>

    <rating
      class="map__rating"
      id="map__rating"
    />

    <teleport to="body">
      <popup
        class="popup-digitization"
        v-model="isPopupDigitizationVisible"
      >
        <task-digitization :all-facts="factsDigitization" />
      </popup>

      <popup
        class="popup-quiz"
        v-model="isPopupQuizVisible"
      >
        <popup-main>
          <template #title>
            Кто здесь профи?
          </template>

          <template #description>
            Хм, кто-то забыл на столе в коридоре брошюру-тест
            «Сотрудник производства 2.0». В нем проверяют пять
            общих навыков, важных в любой профессии: структурное
            мышление, коммуникабельность, знание технологий, умение
            работать в режиме неопределенности и понимание принципов
            бережливого производства. На каждый навык по три вопроса.
            Попробуй сориентироваться — ты ведь, по идее, ого-го какой опытный!
          </template>
        </popup-main>

        <quiz :questions="quizQuestions" />
      </popup>

      <popup
        class="popup-hr"
        v-model="isPopupHRVisible"
        first-step-bg-color="secondary"
      >
        <stepper
          v-model="stepHR"
        >
          <stepper-content
            :step="1"
          >
            <custom-quote
              photo="timur.jpeg"
            >
              <template #name>
                Шахбанов Тимур
              </template>

              <template #profession>
                машинист горных выемочных машин 5 разряда в «ЕвроХим-ВолгаКалий»
              </template>

              <template #text>
                <p>
                  Помню, еще в детстве услышал о таком явлении, как «белые ночи».
                  Маленькому мальчику, конечно, было трудно такое представить, и,
                  уже повзрослев и осознав, что это такое, я надеялся увидеть это
                  чудо природы собственными глазами. Благодаря компании «ЕвроХим»,
                  хотя я и работаю в южной части страны, в Волгоградской области,
                  я два раза побывал в городе Ковдор — летом и зимой. Увидел и ощутил,
                  что такое «белые ночи» и «полярная ночь».
                </p>

                <p>
                  Главное преимущество нашего предприятия — это <b>возможность
                    работать со специалистами</b> своего дела, <b>развиваться как
                    вертикально, так и горизонтально.</b>
                </p>

                <p>
                  <b>За три года работы в компании я поднялся на четыре ступени
                    вверх по карьерной лестнице.</b>
                  Сейчас преодолеваю пятую, и это далеко не предел
                  того, чего я хочу достигнуть в ЕвроХим.
                  Компания помогает развиваться тем, <b class="success-color">кто</b>
                  имеет желание и стремление не останавливаться на достигнутом.
                </p>
              </template>
            </custom-quote>
          </stepper-content>

          <stepper-content
            :step="2"
            :is-next-btn=false
            :is-prev-btn=false
          >
            <popup-main>
              <template #title>
                Отдел кадров
              </template>

              <template #description>
                Прежде чем ты начнешь свой карьерный путь у нас, посмотри, что предлагает
                компания молодым рабочим. В этом чек-листе мы собрали главную информацию
                о карьерных возможностях в Горнорудном дивизионе «ЕвроХим», которая
                поможет взять от работы
                максимум и прокачивать навыки с первой рабочей смены.
              </template>

              <ul class="popup-hr__list">
                <li class="popup-hr__item">
                  <h3 class="popup-hr__item-title">
                    Практика
                  </h3>

                  <p class="popup-hr__item-text">
                    Студенты, которые пока не готовы работать 40 часов в неделю,
                    но хотят узнать, как устроен завод, могут попасть к нам
                    на практику. Здесь ты сможешь понаблюдать за работой
                    более опытных коллег и примерить на себя роль сотрудника
                    международной химической компании. Отчет о практике пойдет
                    в твою зачетку, а ты сделаешь первый шаг в карьере.
                  </p>
                </li>

                <li class="popup-hr__item">
                  <h3 class="popup-hr__item-title">
                    Наставничество
                  </h3>

                  <p class="popup-hr__item-text">
                    Освоиться в компании тебе поможет наставник. Ты будешь
                    учиться у крутого специалиста ЕвроХим — он поделится
                    лайфхаками работы на химическом производстве, которые
                    ты не найдешь в учебниках.
                  </p>
                </li>

                <li class="popup-hr__item">
                  <h3 class="popup-hr__item-title">
                    Выбор карьерного пути
                  </h3>

                  <p class="popup-hr__item-text">
                    Только ты решаешь, кем тебе быть и в каком
                    направлении развиваться. А мы покажем все
                    карьерные опции, поможем определиться с выбором
                    и создадим все условия для быстрого роста.
                  </p>
                </li>

                <li class="popup-hr__item">
                  <h3 class="popup-hr__item-title">
                    Высшее и дополнительное образование
                  </h3>

                  <p class="popup-hr__item-text">
                    В Горнорудном дивизионе «ЕвроХим» действует
                    поддержка для тех, кто стремится к знаниям.
                    Ты можешь получить высшее образование в топовом
                    российском вузе, освоить смежную профессию
                    и пройти переподготовку по своей специальности
                    за счет компании.
                  </p>
                </li>

                <li class="popup-hr__item">
                  <h3 class="popup-hr__item-title">
                    Программы развития
                  </h3>

                  <p class="popup-hr__item-text">
                    Школа мастеров поможет тебе постоянно
                    развиваться и продвигаться по карьерной лестнице быстрее.
                    Ты сможешь занять ключевую должность в компании
                    быстрее, чем твои однокурсники.
                  </p>
                </li>

                <li class="popup-hr__item">
                  <h3 class="popup-hr__item-title">
                    Релокационный пакет
                  </h3>

                  <p class="popup-hr__item-text">
                    Мы хотим, чтобы в ЕвроХим работали лучшие специалисты, и
                    готовы искать их даже на другом конце света. Если ты живешь
                    в другом регионе и хочешь работать у нас, мы поможем с
                    переездом не только тебе, но и твоей семье. Кстати,
                    переезжать не всегда обязательно: география нашего
                    комбината широка, поэтому всегда есть возможность
                    устроиться в своем регионе.
                  </p>
                </li>
              </ul>

              <div class="popup-hr__gradient"></div>
              <a
                href="/checklist-hr.pdf"
                class="btn popup-hr__download"
                download
              >
                Скачать чек-лист
              </a>
            </popup-main>
          </stepper-content>
        </stepper>
      </popup>

      <popup-video
        v-model="isPopupVideoVisible"
        link="https://www.youtube.com/embed/fpGCYmHP2Ns"
      >
        <template #title>
          Узнай больше о ЕвроХим
        </template>

        <template #description>
          Включи видео, чтобы узнать, куда движется компания
          и какие направления профессионального развития у нас есть!
        </template>
      </popup-video>

      <popup
        class="popup-museum"
        v-model="isPopupMuseumVisible"
        first-step-bg-color="secondary"
      >
        <stepper
          v-model="stepMuseum"
        >
          <stepper-content
            :step="1"
            class="popup-museum__step-one"
          >
            <custom-quote
              photo="droval.jpeg"
            >
              <template #name>
                Максим Дроваль
              </template>

              <template #profession>
                механик участка экскавации «Ковдорский ГОК»
              </template>

              <template #text>
                <p>
                  Когда ты женат и у тебя маленький ребенок,
                  <b>важно сохранять баланс</b>. При этом я стараюсь
                  участвовать в различных мероприятиях,
                  проводимых под эгидой «Молодых специалистов».
                  И на себя время необходимо оставлять тоже.
                  Все это получается реализовать только благодаря планированию:
                  я веду ежедневник, стараюсь организовать свой день правильно.
                </p>

                <p>Помимо этого, <b>планирую рабочий процесс</b>, ведь если этого не сделать с утра,
                  работа пойдет на самотек, что негативно скажется на производстве.</p>

                <p>
                  <b>Я реализовал свою мечту</b> — возможность работать
                  по специальности, имея стабильную заработную плату.
                  А также доступ к гигантским горнодобывающим машинам,
                  возможность их изучать — это мне интересно как механику.
                </p>
              </template>
            </custom-quote>
          </stepper-content>

          <stepper-content
            :step="2"
            :is-prev-btn=false
            :is-next-btn=false
          >
            <popup-main>
              <task-museum :facts="factsMuseum" />
            </popup-main>
          </stepper-content>
        </stepper>
      </popup>

      <popup
        class="popup-calculator"
        :class="{ 'clear-bg': stepCalculator === 2 }"
        v-model="isPopupCalculatorVisible"
      >
        <stepper
          v-model="stepCalculator"
        >
          <stepper-content
            :step="1"
            class="popup-calculator__step-one"
            next-btn-name="Посмотреть"
            :is-prev-btn=false
          >
            <popup-main>
              <template #description>
                Какая карьера тебя ждет, если ты будешь
                строить ее на предприятиях в Горнорудном
                дивизионе компании «ЕвроХим»
              </template>
            </popup-main>
          </stepper-content>

          <stepper-content
            :step="2"
            :is-prev-btn=false
            :is-next-btn=false
          >
            <popup-main>
              <calculator></calculator>
            </popup-main>
          </stepper-content>
        </stepper>
      </popup>

      <popup-chat-bot
        v-model="isPopupChatBotVisible"
        :companions="companions"
        :start-messages="startMessages"
        :messages="messages"
      >
        <template #title>
          Заводская столовая
        </template>

        <template #description>
          О, столовая! Давай поговорим с кем-нибудь из
          Горнорудного дивизиона «ЕвроХима»?
          Наверняка тебе удастся выяснить что-то ценное: все
          сотрудники отлично знают компанию и готовы поделиться
          информацией. Выбери, к кому подсесть за столик.
        </template>
      </popup-chat-bot>
    </teleport>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import quizJSON from '@/static/quiz.json';
import factsDigitizationJSON from '@/static/factsDigitization.json';
import factsMuseumJSON from '@/static/factsMuseum.json';

import Popup from '../components/Popup.vue';
import PopupMain from '../components/PopupMain.vue';
import PopupVideo from '../components/PopupVideo.vue';
import Stepper from '@/components/Stepper.vue';
import StepperContent from '@/components/StepperContent.vue';
import TaskDigitization from '@/components/TaskDigitization.vue';
import TaskMuseum from '@/components/TaskMuseum.vue';
import Quiz from '@/components/Quiz.vue';
import Calculator from '@/components/Calculator.vue';
import PopupChatBot from '../components/PopupChatBot.vue';
import Rating from '@/components/Rating.vue';
import CustomQuote from '@/components/CustomQuote.vue';

export default {
  name: 'Map',

  components: {
    Popup,
    PopupMain,
    Stepper,
    StepperContent,
    TaskDigitization,
    TaskMuseum,
    Quiz,
    PopupVideo,
    Calculator,
    PopupChatBot,
    Rating,
    CustomQuote,
  },

  data() {
    return {
      stepHR: 1,
      stepCalculator: 1,
      stepMuseum: 1,
      isPopupHRVisible: false,
      isPopupQuizVisible: false,
      isPopupDigitizationVisible: false,
      isPopupMuseumVisible: false,
      isPopupVideoVisible: false,
      isPopupCalculatorVisible: false,
      isPopupChatBotVisible: false,
      quizQuestions: quizJSON,
      factsDigitization: factsDigitizationJSON,
      factsMuseum: factsMuseumJSON,
      startMessages: new Map([
        ['Здравствуйте! Как ваши дела?', 'Привет! Да все отлично — сегодня годовую премию дают! Хорошо, что встретились, не забудьте сказать своим молодым рабочим, что начали собирать заявки на высшее образование за счет компании.'],
        ['Привет! Какие новости?', 'Привет! Да все отлично — сегодня годовую премию дают! Хорошо, что встретились, не забудьте сказать своим молодым рабочим, что начали собирать заявки на высшее образование за счет компании.'],
        ['Здравствуйте! Ну что, как идет работа?', 'Привет! Да все отлично — сегодня годовую премию дают! Хорошо, что встретились, не забудьте сказать своим молодым рабочим, что начали собирать заявки на высшее образование за счет компании.'],
      ]),
      messages: new Map([
        ['А напомните, как еще компания помогает молодым рабочим?', 'У нас в этом направлении много всего. Вот, помню, Кате Гараевой как молодому специалисту помогали с переездом в Пермский край и получением образования.'],
        ['Можно узнать подробнее историю кого-то из молодых рабочих?', 'Пожалуйста! Екатерина Гараева пришла к нам после университета — тогда Усольский калийный комбинат только строили, а она хотела поучаствовать в таком уникальном проекте. Это был 2014-й, кажется. У нее первая должность — это еще на другом предприятии — инженер-технолог 2 категории. Поучаствовала в грандиозном строительстве нового комбината. Своими глазами увидела, как растет фабрика, от чертежей.'],
        ['Обязательно ли иметь опыт, чтобы попасть в ЕвроХим?', 'Совсем необязательно! У кого как: кто-то приходит сразу после выпуска и растет здесь, вместе с наставником, а кто-то приходит уже с опытом. Наш главный специалист управления технического развития Екатерина Гараева, например, успела поработать инженером-технологом 2 категории на другом предприятии.'],
        ['Сложно ли соблюдать баланс между работой и личной жизнью?', 'Этому можно поучиться у наших сотрудников! У каждого есть увлечения, у многих большие семьи, страсть к путешествиям. На каждом уровне появляются все новые возможности обеспечивать себя и родных, вкладываться в хобби и расширять кругозор.'],
        ['Как быстро можно вырасти до руководителя?', 'Отличный вопрос! Если прийти в ЕвроХим сразу после колледжа, стать руководителем участка можно за 6–8 лет, которые пролетят незаметно. На этом уровне зарплата составляет до 100 000 рублей, появляются возможности повышать квалификацию за счет компании, получать другое дополнительное образование, активно ездить в командировки на другие производства.'],
        ['Карьеру можно построить только в столице?', 'Нет, конечно, чаще успешная <b class="success-color">карьера</b> делается именно в регионах! Можно остаться в своем городе или переехать в регион, где расположено другое производство, и стать крутым профессионалом, если прикладывать усилия и использовать наши ресурсы для роста. Тут, на предприятии, у тебя простор для развития. Наставника дадут, обучение оплатят, будут помогать и предоставлять возможности для профессионального роста. Заодно ты сможешь поучаствовать в важной миссии: участвуя в развитии комбината, сотрудники вкладываются в развитие территории присутствия — инфраструктуры своего города — и создают новые возможности для жизни.'],
        ['Какие профессии сейчас самые востребованные на комбинатах?', 'Нам очень нужны представители рабочих профессий — электрослесари, слесари КИПиА, аппаратчики, лаборанты, электромонтеры, технологический персонал рудника. Кроме того, мы развиваем кросс-функциональных специалистов, поэтому расти можно и в других направлениях. Главное — желание и инициатива от сотрудника!'],
        ['А чем кроме работы увлекаются ваши сотрудники?', 'Наши коллеги работают над мероприятиями профессионального, административного и социально-культурного секторов, участвуют в волонтерских, экологических и профориентационных городских акциях и многом другом. Еще они участвуют в спортивных соревнованиях — от шахмат до футбола.'],
        ['Все стало намного понятнее, спасибо, до свидания!', 'Давай, своим — привет! И вообще, ты разве не следишь за нашими соцсетями? Вот, подписывайся в <a target="_blank" href="https://www.instagram.com/eurochem_career/">Instagram</a> и <a href="https://vk.com/career_eurochem" target="_blank">VK</a>.'],
      ]),
      companions: [
        {
          name: 'Мария Сергеевна',
          position: 'руководитель департамента поставок сырья',
        },
        {
          name: 'Петр Александрович',
          position: 'электрослесарь 4 разряда',
        },
        {
          name: 'Василий Иванович',
          position: 'флотатор 5 разряда',
        },
      ],
      institutes: [],
    };
  },

  watch: {
    isPopupDigitizationVisible(newValue) {
      if (newValue) {
        this.factsDigitization = [...factsDigitizationJSON];
      }
    },
    isPopupMuseumVisible(newValue) {
      if (newValue) {
        this.factsMuseum = { ...factsMuseumJSON };
      }
    },
    isPopupHRVisible(newValue) {
      if (newValue) {
        this.addPoints(1);
        this.updatePoints();
      }
    },
    isPopupVideoVisible(newValue) {
      if (newValue) {
        this.addPoints(2);
        this.updatePoints();
      }
    },
    isPopupCalculatorVisible(newValue) {
      if (newValue) {
        this.addPoints(7);
        this.updatePoints();
      }
    },
  },

  async created() {
    // const institutes = await this.$api.institutes.getRating();

    // if (institutes) {
    //   this.institutes = institutes;
    // }

    this.updatePoints();
  },

  computed: {
    ...mapGetters('auth', [
      'getUser',
    ]),
  },

  methods: {
    showHR() {
      this.isPopupHRVisible = true;
    },

    showQuiz() {
      this.isPopupQuizVisible = true;
    },

    showDigitization() {
      this.isPopupDigitizationVisible = true;
    },

    showVideo() {
      this.isPopupVideoVisible = true;
    },

    showMuseum() {
      this.isPopupMuseumVisible = true;
    },

    showCalculator() {
      this.isPopupCalculatorVisible = true;
    },

    showChatBot() {
      this.isPopupChatBotVisible = true;
    },

    addPoints(taskId) {
      this.$api.user.addPoints({ taskId });
    },

    ...mapActions('auth', [
      'updatePoints',
    ]),
  },
};
</script>

<style scoped>
.map {
  background-color: var(--accent-text-color);
}

.map__btn {
  font-family: 'ProximaNova';
  background: var(--basic-white-color);
  border: 2px solid var(--basic-bg-color);
  position: absolute;
  font-size: 14px;
  line-height: 18px;
  font-weight: 900;
  padding: 2px 8px;
  border-radius: 45px;
  cursor: pointer;
}

.map__btn--hr {
  top: 240px;
  left: 307px;
}

.map__btn--digitization {
  top: 308px;
  left: 185px;
}

.map__btn--museum {
  top: 630px;
  left: 535px;
}

.map__btn--skills {
  top: 980px;
  left: 290px;
}

.map__btn--video {
  top: 1000px;
  left: 85px;
}

.map__btn--calculator {
  bottom: 979px;
  left: 264px;
}

.map__btn--bot {
  top: 550px;
  right: 275px;
}

.map__btn:before {
  content: '';
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 18px solid var(--basic-bg-color);
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.map__btn:after {
  content: '';
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid var(--basic-white-color);
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.container {
  height: 1467px;
  background-image: url(~@/assets/images/map.png);
  background-size: 1040px 1300px;
  background-position: top 113px left 0;
  background-repeat: no-repeat;
}

.map__rules {
  position: absolute;
  top: 95px;
  right: 0;
  width: 418px;
  color: var(--basic-white-color)
}

.map__title {
  font-size: 25px;
  font-weight: 900;
  line-height: 30px;
  margin: 0;
  margin-bottom: 20px;
}

.map__text {
  font-size: 20px;
  line-height: 24px;
  margin: 0;
  margin-bottom: 20px;
}

.popup-quiz::v-deep(.popup__content) {
  background-image: url(~@/assets/icons/quiz-compass.svg);
  background-size: 175px 200px;
  background-repeat: no-repeat;
  background-position: top 104px right;
}

.popup-hr__gradient {
  position: absolute;
  height: 220px;
  width: 100vw;
  left: calc((-100vw + 1100px) / 2);
  bottom: 0;
  background: linear-gradient(
    180deg,
    #FFFFFF 0%,
    #C0EAF8 15.91%,
    #87D7F2 32.51%,
    #56C7EC 48.59%,
    #31BAE8 63.73%,
    #16B1E5 77.7%,
    #06ACE4 90.09%,
    #00AAE3 99.61%);
    z-index: -1;
}

.popup-hr__step-one::after {
  content: '';
  position: absolute;
  top: 50px;
  right: -132px;
  width: 385px;
  height: 370px;
  background-image: url(~@/assets/icons/ivan-petrov.svg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.popup-hr__list {
  width: 688px;
  list-style: none;
  padding: 0;
  margin: 84px 0 60px 144px;
}

.popup-hr__item {
  position: relative;
  padding-left: 128px;
}

.popup-hr__item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
  height: 45px;
  background-image: url(~@/assets/icons/list-item.svg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.popup-hr__item:not(:last-child) {
  margin-bottom: 40px;
}

.popup-hr__item-title {
  font-size: 30px;
  font-weight: 900;
  line-height: 37px;
  color: var(--accent-text-color);
  margin: 0;
  margin-bottom: 10px;
}

.popup-hr__item-text {
  font-size: 20px;
  line-height: 1.25;
  color: var(--accent-text-color);
}

.popup-hr__download {
  margin-left: 272px;
}

.popup-hr__list:before {
  content: '';
  background: url('../assets/img/hr-departament/hr-top.svg') no-repeat;
  position: absolute;
  width: 397px;
  height: 359px;
  top: 0;
  right: 150px;
}

.popup-hr__list:after {
  content: '';
  background: url('../assets/img/hr-departament/hr-bg.svg') no-repeat;
  position: absolute;
  width: 222px;
  height: 100%;
  bottom: 0;
  background-position: bottom right;
  right: calc((-100vw + 1100px) / 2);
}

.popup-calculator {
  background: linear-gradient(180deg, #FFFFFF 0%, #00AAE3 99.61%);
}

.popup-calculator::before {
  content: '';
  background: url('../assets/img/calculator/men_1.svg');
  position: absolute;
  width: 184px;
  height: 170px;
  bottom: 0;
  left: 10%;
}

.popup-calculator::after {
  content: '';
  background: url('../assets/img/calculator/men_2.svg');
  position: absolute;
  width: 184px;
  height: 170px;
  bottom: 0;
  right: 10%;
}

.popup-calculator.clear-bg {
  background: #FFFFFF;
}

.popup-calculator.clear-bg::before,
.popup-calculator.clear-bg::after {
  content: none;
}

.map__points {
  position: absolute;
  top: 630px;
  background: var(--accent-color);
  right: 0;
  color: var(--accent-text-color);
  border-radius: 100%;
  width: 122px;
  height: 122px;
  padding-top: 18px;
  font-weight: 900;
}

.map__points .big {
  font-size: 50px;
  line-height: 50px;
  display: block;
  text-align: center;
}

.map__points .small {
  font-size: 17px;
  line-height: 20px;
  display: block;
  text-align: center;
}

.map__rating >>> .h2,
.map__rating >>> .text {
  color: var(--basic-white-color);
}

.map__rating >>> .rating__institute-name {
  color: var(--basic-white-color);
}
</style>
