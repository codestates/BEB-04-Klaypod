from csv import excel_tab
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException
import time
import pprint
import datetime
from pytz import timezone
from bson.objectid import ObjectId
from pymongo import MongoClient

id = "fdongfdong"
password = "0410"
KST = timezone('Asia/Seoul')
today = datetime.datetime.now()


def apyToApr(APY):
    return (((1+APY/100)**(1/365)-1)*365)*100

def aprToFloat(str):
    if 'K' in str:
        str = str.split('K')
        return float(str[0])*1000
    else:
        return float(str)

def stringToInteger(str):
    temp = str.split(',')
    float_tvl = float(''.join(temp))
    integer_tvl = int(float_tvl)
    return integer_tvl


def get_kronosdao_tvl():
    try:
        driver = set_chrome_driver()
        driver.get('https://app.kronosdao.finance/#/stake')
        wait = WebDriverWait(driver, 20)
        element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                                        '#root > div > div.jss2.false > div > div > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > p.stake-card-metrics-value')))
        time.sleep(3)
        tvl = driver.find_element(By.CSS_SELECTOR, '#root > div > div.jss2.false > div > div > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > p.stake-card-metrics-value').text
        result = tvl.replace('$', '')
        result = stringToInteger(result) 
        print('kronosdao tvl:',result)
        return result
    except NoSuchElementException as e:
        print('get_kronosdao_tvl() : ', e.msg)

    finally:
        driver.quit()


def get_defi_total_tvl(swap):
    kokonutswap_uri = "https://kokonutswap.finance/"
    claimswap_uri = "https://app.claimswap.org/farm"
    klayswap_url = "https://klayswap.com/dashboard"
    driver = set_chrome_driver()

    if swap == "kokonutswap":
        driver.get(kokonutswap_uri)
        wait = WebDriverWait(driver, 10)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#root > div.sc-jaSCiF.hFBVCa > div.sc-bBHxTw.eeUxaJ > div.sc-giYglK.iLdmPu > div:nth-child(2) > div.sc-kLwhqv.iPKQFl')))

        total_tvl = driver.find_element(By.CSS_SELECTOR, '#root > div.sc-jaSCiF.hFBVCa > div.sc-bBHxTw.eeUxaJ > div.sc-giYglK.iLdmPu > div:nth-child(2) > div.sc-kLwhqv.iPKQFl').text
        result = total_tvl.replace('$', "")
        result = stringToInteger(result)
        return result
    elif swap == 'klayswap':
        driver.get(klayswap_url)
        wait = WebDriverWait(driver, 10)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#app > main > section > article > '
                                                                'div.dashboard-page__summary__service > '
                                                                'section:nth-child(1) > '
                                                                'div.dashboard-page__summary__service__card__label')))
        total_tvl = driver.execute_script("return document.getElementsByClassName('dashboard-page_"
                                          "_summary__service__card__label')[0].lastChild.textContent")
        result = total_tvl.replace(' $ ', '')
        result = stringToInteger(result)
        return result

    elif swap == 'claimswap':
        driver.get(claimswap_uri)
        wait = WebDriverWait(driver, 10)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#root > div.page-template >'
                                                                ' div > div.farm-list-page > '
                                                                'section:nth-child(1) > div > div > span')))

        total_tvl = driver.find_element(By.CSS_SELECTOR,'#root > div.page-template > div > '
                                            'div.farm-list-page > section:nth-child(1) '
                                            '> div > div > span').text
        result = total_tvl.replace('$ ', '')
        result = stringToInteger(result)
        return result

    else:
        return None

def get_paladex_tvl():
    try:
        driver = set_chrome_driver()
        driver.get('https://pala.world/')
        time.sleep(10)
        wait = WebDriverWait(driver, 20)
        element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                                        '#root > div.sc-cykDdr.kXuprC > div > div.sc-gTeHfO.jLuFws > div.sc-llTkbl.gbLzrp > div:nth-child(2)')))
        time.sleep(3)
        tvl = driver.find_element(By.CSS_SELECTOR, '#root > div.sc-cykDdr.kXuprC > div > div.sc-gTeHfO.jLuFws > div.sc-llTkbl.gbLzrp > div:nth-child(2) > div > div > div > span').text
        result = stringToInteger(tvl) 
        print('paladex tvl:',result)
        return result
    except NoSuchElementException as e:
        print('get_paladex_tvl() : ', e.msg)
        return
    finally:
        driver.quit()


def get_definix_tvl():
    try:
        driver = set_chrome_driver()
        driver.get('https://bsc.definix.com/')
        wait = WebDriverWait(driver, 20)
        element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                                        '#root > div.sc-fuISkM.cHQuCr > div > div.sc-gsWcmt.itabtS > div > div > div > div.sc-ellfGf.gDpmYH > div.sc-eWnToP.sc-dvUynV.fEDxD.joRTNm > div.flex.align-stretch.mt-5.flex-wrap > div:nth-child(1) > div.sc-dIsUp.dpVnaC.mb-5.mt-6 > div.sc-fTZpSt.laBTtD > h2')))
        time.sleep(3)
        tvl = driver.execute_script("return document.getElementsByClassName('sc-gtsrHT sc-dIvrsQ gQHofZ dwgxCi')[0].textContent")
        print(tvl)
        result = tvl.replace('$', '')
        result = stringToInteger(result) 
        print('definix tvl:',result)
        return result
    except NoSuchElementException as e:
        print('get_definix_tvl() : ', e.msg)
        return
    finally:
        driver.quit()


def get_kokoa_tvl():
    try:
        driver = set_chrome_driver()
        driver.get('https://app.kokoa.finance/')
       
        wait = WebDriverWait(driver, 20)
        element = wait.until(EC.presence_of_element_located((By.XPATH,
                                                        '//*[@id="app"]/main/section/div[2]/div[1]/div[2]/p/span')))
        time.sleep(10)
        tvl = driver.execute_script('return document.getElementsByClassName("price")[0].children[0].textContent')
        print('kokoa :',tvl)
        result = stringToInteger(tvl) 
        return result
    except NoSuchElementException as e:
        print('get_definix_tvl() : ', e.msg)
        return
    finally:
        driver.quit()


def get_ufoswap_tvl():
    try:
        driver = set_chrome_driver()
        driver.get('https://ufoswap.fi/#/dashboard')
        wait = WebDriverWait(driver, 20)
        element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                                        '#root > div.FUewKmCp1JJaQaTpfTxg > div.YgX_WXxG40Ab4PDD_izX.css-1qlddkf > div.f3aBPO8CPG2UUrcUbAgU.css-tgwkf > div.Er_SkJQp1_mR0bZlUaxc.css-ovnx7g > div.bUY5UCAWUZdm_kt7eTT1.css-1vt08d7 > p:nth-child(3) > span.ZEBlYDJEl7ncPrQ6Q2pM')))
        time.sleep(5)
        tvl = driver.find_element(By.CSS_SELECTOR, '#root > div.FUewKmCp1JJaQaTpfTxg > div.YgX_WXxG40Ab4PDD_izX.css-1qlddkf > div.f3aBPO8CPG2UUrcUbAgU.css-tgwkf > div.Er_SkJQp1_mR0bZlUaxc.css-ovnx7g > div.bUY5UCAWUZdm_kt7eTT1.css-1vt08d7 > p:nth-child(3) > span.ZEBlYDJEl7ncPrQ6Q2pM').text
        result = stringToInteger(tvl) 
        print('ufoswap tvl:',result)
        return result
    except NoSuchElementException as e:
        print('get_ufoswap_tvl() : ', e.msg)
        return
    finally:
        driver.quit()


def get_meshswap_tvl():
    try:
        driver = set_chrome_driver()
        driver.get('https://meshswap.fi/dashboard')
        wait = WebDriverWait(driver, 20)
        element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                                        '#app > main > section > article > div.dashboard-page__summary__service > section:nth-child(1) > div.dashboard-page__summary__service__card__label')))

        tvl = driver.find_element(By.CSS_SELECTOR, '#app > main > section > article > div.dashboard-page__summary__service > section:nth-child(1) > div.dashboard-page__summary__service__card__label > div.dashboard-page__summary__service__card__label__selected > p > strong').text
        result = stringToInteger(tvl) 
        print('meshswap tvl:',result)
        return result
    except NoSuchElementException as e:
        print('get_meshswap_tvl() : ', e.msg)
        return
    finally:
        driver.quit()


def run_klaySwap_crawl():
    try:
        klayswap_id = klaypod_collection.projects.find_one({"name": "KlaySwap"}, {"_id": 1})
        project_id = ObjectId(klayswap_id['_id'])
        data_set = []
        driver = set_chrome_driver()
        driver.get('https://klayswap.com/exchange/pool')
        wait = WebDriverWait(driver, 10)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#exchange-page > div > section > '
                                                                'div.pool-main-body > section > '
                                                                'article > div.pool-table__body > '
                                                                'div:nth-child(1) > div.pool-table__'
                                                                'col.pool-table__col--pair > div:nth-child(2) > '
                                                                'p:nth-child(2) > strong')))
        time.sleep(0.5)

        for page in range(1, 100):
            if (page > 1 and page < 11):
                driver.find_element(By.XPATH,
                                    '//*[@id="exchange-page"]/div/section/div[2]/section/section/div[{0}]'
                                    .format(page)).click()
                time.sleep(0.3)
            if page > 10:
                driver.find_element(By.CSS_SELECTOR, '#exchange-page > div > section > div.pool-main-body >'
                                                     ' section > section > '
                                                     'button.common-pager-button.common-pager-button--next').click()


                time.sleep(0.3)
            for line in range(1, 11):
                column = ('#exchange-page > div > section > div.pool-main-body > section > article > '
                          'div.pool-table__body > div:nth-child({0}) > div.pool-table__col.pool-table'.format(line))
                length = driver.execute_script(
                    'return document.getElementsByClassName("pool-table__col pool-table__col--pair")[{0}].getElementsByTagName("img").length'.format(
                        line))
                logo = []
                for i in range(1, length + 1):
                    logo.append(driver.find_element(By.CSS_SELECTOR,
                                                    column + "__col--pair > div:nth-child(1) > div:nth-child({0}) > img".format(
                                                        i)).get_attribute("src"))

                pair = driver.find_element(By.CSS_SELECTOR, column + '__col--pair > div:nth-child(2) > '
                                                                     'p:nth-child(2) > strong').text
                tvl = driver.find_element(By.CSS_SELECTOR, column + '__col--liquidity > p > strong > span').text
                apr = driver.find_element(By.CSS_SELECTOR, column + '__col--estimated > p.pool-table__col.pool-table__'
                                                                    'col--main-rate').text.replace("  %", "")
                print('pair: {0}; tvl: {1}; apr: {2}'.format(pair, tvl, apr))

                data_set.append({
                    "pair": pair,
                    "tvl": stringToInteger(tvl),
                    "apr": aprToFloat(apr),
                    "logo": logo,
                    "project_id": 1,
                    "isActive": True,
                    "createAt": str(today.astimezone(KST)),
                    "project_id": project_id
                })

                time.sleep(0.1)
            try:
                driver.find_element(By.CSS_SELECTOR,
                                    '#exchange-page > div > section > div.pool-main-body >'
                                    ' section > section > button.common-pager-button.common-pager-button--last')
            except NoSuchElementException:
                break

    except NoSuchElementException:
        print('NoSuchElementException')
        print(len(data_set))
    finally:
        print('klayswap pair insert : ',len(data_set))
        return data_set
    driver.quit()


def run_claimswap_crawl():
    data_set = []
    try:
        claimswap_id = klaypod_collection.projects.find_one({"name":"ClaimSwap"},{"_id":1})
        project_id = ObjectId(claimswap_id['_id'])
        driver = set_chrome_driver()
        driver.get('https://app.claimswap.org/farm')
        wait = WebDriverWait(driver, 10)
        element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                                         '#root > div.page-template > div > div.farm-list-page > '
                                                         'section:nth-child(4) > div > div.farm-list > div > '
                                                         'div:nth-child(1) > div.MuiGrid-root.FarmLp_lp_box__'
                                                         'dQuNv.MuiGrid-container.MuiGrid-align-items-xs-center > '
                                                         'div.MuiGrid-root.FarmLp_lp_label_'
                                                         '_0rRSN.MuiGrid-item.MuiGrid-grid-sm-5.MuiGrid-grid-lg-3 > span')))
        last_height = driver.execute_script("return document.body.scrollHeight;")
        while True:
            driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')

            time.sleep(2)  # 스크롤 후 창이 로딩될 때 까지 2초 기다림
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight-50);")
            # 맨 아래까지 스크롤 후 살짝 올림(맨아래까지 한번에 내리면 데이터를 가져오지 못하는 경우가 있음)
            time.sleep(1)

            new_height = driver.execute_script("return document.body.scrollHeight")
            # 스크롤 후 창의 높이를 새로운 높이로 저장

            if new_height == last_height:
                # 새로운 높이가 이전 높이와 같으면 종료 (더이상 스크롤할게 없다는 의미)
                break

            last_height = new_height
        length = driver.execute_script('return document.body.getElementsByClassName("FarmLp_lp_container__3QOgF").length')
        for i in range(1, length + 1):
            logo = []
            column = '#root > div.page-template > div > div.farm-list-page > ' \
                     'section:nth-child(4) > div > div.farm-list > div > div:nth-child({0}) > ' \
                     'div.MuiGrid-root.FarmLp_lp_box__dQuNv.MuiGrid-container.MuiGrid-align-items-xs-center >'.format(i)
            for j in range(0, 2):
                logo.append(driver.execute_script(
                    "return document.getElementsByClassName('MuiGrid-root FarmLp_lp_box__dQuNv MuiGrid-container MuiGrid-align-items-xs-center')[{0}].childNodes[0].childNodes[0].children[{1}].children[0].getAttribute('src')".format(
                        i - 1, j)))
            pair = driver.find_element(By.CSS_SELECTOR, column + " div.MuiGrid-root.FarmLp_lp_label__"
                                                                 "0rRSN.MuiGrid-item.MuiGrid-grid-sm-5."
                                                                 "MuiGrid-grid-lg-3 > span").text
            tvl = driver.find_element(By.CSS_SELECTOR, column + " div:nth-child(3) > span:nth-child(2)").text
            apy = driver.find_element(By.CSS_SELECTOR, column + " div:nth-child(5) > span:nth-child(2)").text
            data_set.append({
                "pair": pair,
                "tvl": stringToInteger(tvl.replace("$ ", "")),
                "apr": round(apyToApr(float(apy.replace(" %", ""))), 1),
                "logo": logo,
                "isActive": True,
                "createAt": str(today.astimezone(KST)),
                "project_id": project_id

            })
    except NoSuchElementException as e:
        print(e.msg)
    finally:
        driver.quit()
        return data_set

def run_kokonutswap_crawl():
    data_set = []
    kokonutswap_id = klaypod_collection.projects.find_one({"name": "KokonutSwap"}, {"_id": 1})
    project_id = ObjectId(kokonutswap_id['_id'])
    driver = set_chrome_driver()
    driver.get('https://kokonutswap.finance/pools')
    wait = WebDriverWait(driver, 10)
    wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                           '#root > div.sc-jaSCiF.hFBVCa > div.sc-jWUzzU.dnVhSJ > div.sc-dUbtfd.lAFdh > div.pc > div > div:nth-child(3) > div:nth-child(1) > div.sc-dkYRCH.eCPzQu > div.sc-XxNYO.eLbIyN')))
    time.sleep(3)
    # 페어 갯수
    list_length = driver.execute_script('return document.getElementsByClassName("sc-evcjhq fOevNH")[0].children.length')
    time.sleep(0.4)
    try:
        for i in range(2, list_length + 2):
            column = '#root > div.sc-jaSCiF.hFBVCa > div.sc-jWUzzU.dnVhSJ > div.sc-dUbtfd.lAFdh > div.pc > div > div:nth-child({0}) > div:nth-child(1) >  '.format(i)
            length = driver.execute_script(
                'return document.getElementsByClassName("sc-dkYRCH iaECIk")[{0}].getElementsByTagName("img").length'.format(
                    i - 2))
            logo = []
            for j in range(0, length):
                img_src = driver.execute_script(
                    'return document.getElementsByClassName("sc-dkYRCH iaECIk")[2].getElementsByTagName("img")[{0}].getAttribute(\'src\')'.format(
                        j))
                logo.append('https:/kokonutswap.finance' + img_src)
                # '#root > div.sc-ddnlvQ.juaBBL > div.sc-jWUzzU.dnVhSJ > div.sc-dUbtfd.lAFdh > div.pc > div > div:nth-child({0}) > div:nth-child(1) > '
                # '#root > div.sc-jaSCiF.hFBVCa > div.sc-jWUzzU.dnVhSJ > div.sc-dUbtfd.lAFdh > div.pc > div > div:nth-child(2) > div:nth-child(1) > div.sc-dkYRCH.eCPzQu > div.sc-ilfuhL.fVkpWP'
            pair = driver.find_element(By.CSS_SELECTOR, column + 'div.sc-dkYRCH.eCPzQu > div.sc-ilfuhL.fVkpWP').text
            tvl = driver.find_element(By.CSS_SELECTOR, column + 'div.sc-dkYRCH.eCPvQm').text
            apr = driver.find_element(By.CSS_SELECTOR, column + 'div.sc-dkYRCH.iaECFY > div').text
            print('pair: {0};tvl: {1};apr: {2}'.format(pair, tvl, apr))

            data_set.append({
                "pair": pair,
                "tvl": stringToInteger(tvl.replace("$", "")),
                "apr": float(apr.replace("%", "")),
                "logo": logo,
                "isActive": True,
                "createAt": str(today.astimezone(KST)),
                "project_id": project_id
            })
    except NoSuchElementException as e:
        print(e.msg)
    finally:
        driver.quit()
        print(len(data_set))
        return data_set


def set_chrome_driver():
    chrome_options = webdriver.ChromeOptions()
    # chrome_options.add_argument('headless')
    chrome_options.add_argument("no-sandbox")
    chrome_options.add_argument("window-size=1920x1080")
    # chrome_options.add_argument("disable-gpu")
    chrome_options.add_argument("lang=ko_KR")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36")
    return webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)


def get_database():
    CONNECTION_STRING = "mongodb+srv://{0}:{1}@klaypod.owsxw.mongodb.net/?retryWrites=true&w=majority".format(id, password)
    client = MongoClient(CONNECTION_STRING)
    return client


def create_project_collection():
    klaypod_collection.projects.insert_many(
        [
            {"name": "KlaySwap", "logo": "https://klayswap.com/img/logo/logo.svg",
             "url": "https://klayswap.com/exchange/pool", "isActive": True, "createAt": str(today.astimezone(KST)), "tvl": get_defi_total_tvl('klayswap')},
            {"name": "KokonutSwap", "logo": "https://cdn-images-1.medium.com/max/280/1*1Ah4r6CMB8p1UXp_AMmdBQ@2x.jpeg",
             "url": "https://kokonutswap.finance/pools", "isActive": True, "createAt": str(today.astimezone(KST)), 'tvl': get_defi_total_tvl('kokonutswap')},
            {"name": "ClaimSwap", "logo": "https://raw.githubusercontent.com/claimswap/claim-content/master/images/token/CLA.png",
             "url": "https://app.claimswap.org/farm", "isActive": True, "createAt": str(today.astimezone(KST)), 'tvl': get_defi_total_tvl('claimswap')},
            {"name": "MeshSwap", "logo": "https://meshswap.fi/img/logo/logo.svg",
             "url": "https://meshswap.fi/", "isActive": True, "createAt": str(today.astimezone(KST)), 'tvl': get_meshswap_tvl()},
            {"name": "KronosDAO", "logo": "https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=2,format=auto/https%3A%2F%2F72305283-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fcollections%252F7b9ozyjwzvkC7hjrRDVf%252Ficon%252Fafmv5zJGEMB8XT1HP38j%252FKRNO%2520(coinmarket).png%3Falt%3Dmedia%26token%3Db619099e-f0a0-48cb-89c5-f2d27872c6b9",
             "url": "https://kronosdao.finance/", "isActive": True, "createAt": str(today.astimezone(KST)), 'tvl': get_kronosdao_tvl()},
            {"name": "PalaDex", "logo": "https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1,format=auto/https%3A%2F%2F24146194-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MkjItwNBwi4w_TNbGD4%252Ficon%252FGEtSR8kTfoOWiFNsdkNS%252FPalaDocs_Profile%2520(1).png%3Falt%3Dmedia%26token%3D485db6ba-1886-4754-bb85-d1fd5e4b682f",
             "url": "https://pala.world/", "isActive": True, "createAt": str(today.astimezone(KST)), 'tvl': get_paladex_tvl()},
            {"name": "UFOSwap", "logo": "https://ufoswap.fi/e996f57f9e9d6b1f7f84de0453e09a45.png",
             "url": "https://ufoswap.fi/#/", "isActive": True, "createAt": str(today.astimezone(KST)), 'tvl': get_ufoswap_tvl()},
            {"name": "Klaymore Stakehouse", "logo": "https://klaystake.house/assets/logo_h.0edcd15c.svg",
             "url": "https://klaystake.house/", "isActive": True, "createAt": str(today.astimezone(KST)), 'tvl': get_klaymore_tvl()},
            {"name": "Definix", "logo": "data:image/png;base64,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",
             "url": "https://www.definix.com/en", "isActive": True, "createAt": str(today.astimezone(KST)), 'tvl': get_definix_tvl()},
             {"name": "Kokoa Finance", "logo": "https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1,format=auto/https%3A%2F%2F3455216692-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fcollections%252F-MfWy5YwJ52IMee8uNFt%252Ficon%252FVRbzWtw0CjnMMp9rBwsl%252F%25E1%2584%2590%25E1%2585%25A9%25E1%2584%258F%25E1%2585%25B3%25E1%2586%25AB%25E1%2584%2585%25E1%2585%25A9%25E1%2584%2580%25E1%2585%25A9.png%3Falt%3Dmedia%26token%3D622c2323-9021-4fe2-bad7-c5abd26acb83",
             "url": "https://kokoa.finance/", "isActive": True, "createAt": str(today.astimezone(KST)), 'tvl': get_kokoa_tvl()},
     
        ]
    )

def get_klaymore_tvl():
    try:
        driver = set_chrome_driver()
        driver.get('https://klaystake.house/')
        time.sleep(10)
        wait = WebDriverWait(driver, 20)
        element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                                        '#root > div > div.c-jZbBBC > div.c-cFPjbQ > div.c-tBQnD.anchor.stats > div > div.c-mkQZh > span > span')))

        tvl = driver.find_element(By.CSS_SELECTOR, '#root > div > div.c-jZbBBC > div.c-cFPjbQ > div.c-tBQnD.anchor.stats > div > div.c-mkQZh > span > span').text
        print(tvl)
        result = stringToInteger(tvl) 
        print('klaymore tvl:',result)
        return result
    except NoSuchElementException as e:
        print('get_klaymore_tvl() : ', e.msg)
        return
    finally:
        driver.quit()


def insert_data_set(data_set):
    print(len(data_set))
    for data in data_set:
        klaypod_collection.pairs.insert_one(data)


if __name__ == '__main__':

    try:
        connect_db = get_database()
        klaypod_collection = connect_db.klaypod
    except Exception:
        print("Unable to connect to the server.")

    try:
        klaypod_collection.pairs.drop()
    except:
        print("자료가 없습니다.")

    try:
        klaypod_collection.projects.drop()

    except:
        print("자료가 없습니다.")
    create_project_collection()
    insert_data_set(run_klaySwap_crawl())
    insert_data_set(run_kokonutswap_crawl())
    insert_data_set(run_claimswap_crawl())

