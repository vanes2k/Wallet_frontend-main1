import {React, useEffect} from "react";

import HeaderLend from "../Lending/HeaderLend/HeaderLend";
import FooterLend from "../Lending/FooterLend/FooterLend";

import './PrivacyPolicy.css';

function PrivacyPolicy({setIsLogin}) {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="lending"> 

    <HeaderLend setIsLogin={setIsLogin}/>

    <section className="privacy-policy">
      <h3 className="privacy-policy__title">Политика конфиденциальности</h3>
      <h4 className="privacy-policy__subtitle">1. Общие положения</h4>
      <p className="paragraph privacy-policy__paragraph">
        Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые ООО «ИТ и Компания» (далее – Оператор)
      </p>
      <p className="paragraph privacy-policy__paragraph">
        1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
      </p>
      <p className="paragraph privacy-policy__paragraph">
        1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее – Политика) применяется ко всей информации, которую Оператор может получить о пользователях веб-приложение <a className="privacy-policy__link" href="#">https://capitalcontrol.ru</a>.
      </p>

      <h4 className="privacy-policy__subtitle">2. Основные понятия, используемые в Политике</h4>
      <p className="paragraph privacy-policy__paragraph">
        2.1. Автоматизированная обработка персональных данных – обработка персональных данных с помощью средств вычислительной техники;
      </p>
      <p className="paragraph privacy-policy__paragraph">
        2.2. Блокирование персональных данных – временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных);
      </p>
      <p className="paragraph privacy-policy__paragraph">
        2.3. Веб-сайт – совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по адресу <a className="privacy-policy__link" href="#">https://capitalcontrol.ru</a>.
      </p>
      <p className="paragraph privacy-policy__paragraph">
        2.4. Информационная система персональных данных — совокупность содержащихся в базах данных персональных данных, и обеспечивающих их обработку информационных технологий и технических средств;
      </p>
      <p className="paragraph privacy-policy__paragraph">
        2.5. Обезличивание персональных данных — действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту персональных данных;
      </p>
      <p className="paragraph privacy-policy__paragraph">
        2.6. Обработка персональных данных – любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных;
      </p>
      <p className="paragraph privacy-policy__paragraph">
        2.7. Оператор – государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующие и (или) осуществляющие обработку персональных данных, а также определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными;
      </p>
      <p className="paragraph privacy-policy__paragraph">
        2.8. Персональные данные – любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-приложения <a className="privacy-policy__link" href="#">https://capitalcontrol.ru</a>.
      </p>
      <p className="paragraph privacy-policy__paragraph">
        2.9. Пользователь – любой посетитель веб-приложения <a className="privacy-policy__link" href="#">https://capitalcontrol.ru</a>.
      </p>

      <h4 className="privacy-policy__subtitle">3. Оператор может обрабатывать следующие персональные данные Пользователя</h4>
      <p className="paragraph privacy-policy__paragraph">
      
      </p>  
      <p className="paragraph privacy-policy__paragraph">
        3.1. Адрес электронной почты; 
      </p>  
      <p className="paragraph privacy-policy__paragraph">
        3.2. Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie») с помощью сервисов интернет-статистики (Яндекс Метрика и Гугл Аналитика и других).
      </p>  
      <p className="paragraph privacy-policy__paragraph">
        3.3. Вышеперечисленные данные далее по тексту Политики объединены общим понятием Персональные данные.
      </p>  

      <h4 className="privacy-policy__subtitle">4. Цели обработки персональных данных</h4>
      <p className="paragraph privacy-policy__paragraph">
        4.1. Цель обработки персональных данных Пользователя — предоставление доступа Пользователю к информации и/или материалам, содержащимся на веб-приложении <a className="privacy-policy__link" href="#">https://capitalcontrol.ru</a>;
      </p>  
      <p className="paragraph privacy-policy__paragraph">
        4.2. Обезличенные данные Пользователей, собираемые с помощью сервисов интернет-статистики, служат для сбора информации о действиях Пользователей, улучшения качества приложения и его содержания.
      </p>  

      <h4 className="privacy-policy__subtitle">5. Правовые основания обработки персональных данных</h4>
      <p className="paragraph privacy-policy__paragraph">
        5.1. Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки Пользователем самостоятельно через специальные формы, расположенные на сайте <a className="privacy-policy__link" href="#">https://capitalcontrol.ru</a>. Заполняя соответствующие формы и/или отправляя свои персональные данные Оператору, Пользователь выражает свое согласие с данной Политикой.
      </p>  
      <p className="paragraph privacy-policy__paragraph">
        5.2. Оператор обрабатывает обезличенные данные о Пользователе в случае, если это разрешено в настройках браузера Пользователя (включено сохранение файлов «cookie» и использование технологии JavaScript).
      </p>  

      <h4 className="privacy-policy__subtitle">6. Порядок сбора, хранения, передачи и других видов обработки персональных данных</h4>
      <p className="paragraph privacy-policy__paragraph">
        Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области защиты персональных данных.
      </p>  
      <p className="paragraph privacy-policy__paragraph">
        6.1. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.
      </p>  
      <p className="paragraph privacy-policy__paragraph">
        6.2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства.
      </p>  
      <p className="paragraph privacy-policy__paragraph">
        6.3. В случае выявления неточностей в персональных данных, Пользователь может актуализировать их самостоятельно, путем направления Оператору уведомление на адрес электронной почты Оператора privacy@mywebsite.ru с пометкой «Актуализация персональных данных».
      </p>  
      <p className="paragraph privacy-policy__paragraph">
        6.4. Срок обработки персональных данных является неограниченным. Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на электронный адрес Оператора privacy@mywebsite.ru с пометкой «Отзыв согласия на обработку персональных данных», Оператор обязуется прекратить их обработку в течении 3 (трех) рабочих дней с уведомлением по электронной почте.
      </p>  

      <h4 className="privacy-policy__subtitle">7. Заключительные положения</h4>
      <p className="paragraph privacy-policy__paragraph">
        7.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты privacy@mywebsite.ru.
      </p>  
      <p className="paragraph privacy-policy__paragraph">
        7.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.
      </p>  
      <p className="paragraph privacy-policy__paragraph">
        7.3. Актуальная версия Политики в свободном доступе расположена в сети Интернет по адресу <a className="privacy-policy__link" href="#">https://capitalcontrol.ru</a>.
      </p>  
    </section>

    <FooterLend />
    </div>
  )
}

export default PrivacyPolicy;