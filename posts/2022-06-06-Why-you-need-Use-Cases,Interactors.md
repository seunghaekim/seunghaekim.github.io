---
title: 당신에게 유스케이스/인터랙터가 필요한 이유
title_origin: Why you need Use Cases/Interactors
author: Denis Brandi
translator: seunghaekim
url_origin: https://proandroiddev.com/why-you-need-use-cases-interactors-142e8a6fe576
date: 2019-10-16
layout: layouts/post.njk
---

원본: [Why you need Use Cases/Interactors, Denis Brandi](https://proandroiddev.com/why-you-need-use-cases-interactors-142e8a6fe576)

![](https://miro.medium.com/max/1400/1*ctTsvKlwqgDXx4W0fALqeg.png)

**클린 아키텍쳐**가 안드로이드계에서 뜨거운 화두가 되었을 때 그것이 어떻게 작동하고 이점이 무엇인지에 대한 수많은 코드 샘플과 아티클들이 있었다.

어쨌거나 나는 이를 도입하려는 개발자들로부터 언제나 다음과 같은 질문들을 받곤 했다.

> 유스케이스/인터랙터가 하고자 하는 것은 무엇인가?

> 왜 Presenter/ViewModel로부터 리포지토리를 직접 호출 할 수 없는 것인가?

> 왜 내가 리포지토리를 호출하는 용도 말고는 다른 용도가 없는 유스케이스를 만들어야 하는가? 이건 내 앱에 과도한 작업이 아닐까?

> 진짜 각각의 리포지토리 메서드에 대해 유스케이스를 만들어야 하는걸까?

이 질문들은 모두 적절한 질문들이고, 이 문서가 설명하고자 하는 지점들이다.

부디 내가 이들을 설명하는데 비참하게 실패하지 않길 바란다.

## 계층화된 아키텍쳐(Layered Architectures)와 어플리케이션 계층(Application Layer)

![Layered Architecture](https://miro.medium.com/max/1064/1*CAdK7Eqcbaof4p-N_HHv8Q.png)

**유스케이스(Use Cases)**를 이해하기 위해 우선 **게층화된 아키텍쳐**와 서비스 레이어로 알려진 **어플리케이션 계층**을 이해해야 한다.

### 관심사의 분리

대부분의 아키텍쳐의 목표 중 하나는 관심사의 분리에 있다.

소프트웨어 시스템을 나누는 여러 다른 방법이 있지만, 산업계의 수년에 걸친 실험을 통해 다음의 몇 가지로 수렴되는 표준적인 계층들이 있다:

1. **Presentation**: 사용자에게 정보를 보여주고 사용자의 명령을 해석한다;
2. **Application**: 도메인 모델들로부터 데이터 흐름을 조직해 소프트웨어가 해야 할 일을 정의한다;
3. **Domain**: 비즈니스 컨셉에 대응한다. 현재 상황과 비즈니스 규칙에 관한 정보이다;
4. **Data**: 도메인 모델의 영속성에 대응한다.

### 계층의 실현(Layers implementation)

프로그램의 크기에 기반해 당신은 계층을 실현(implementation)할 방법을 선택할 수 있다:

- 만약 당신이 간단한 bash script를 작성하고 있다면 주처리부(main procedure)를 각각 다른 서브루틴에 따라 나눌 수 있다.
- 만약 당신이 간단한 안드로이드 스튜디오 플러그인을 작성하고 있다면 클래스에 따라 계층을 나눌 수 있다.
- 만약 당신이 간단한 앱을 작성하고 있다면 패키지에 따라 계층을 나눌 수 있다.
- 만약 당신이 복잡한 앱이나 웹서비스를 작성하고 있다면 모듈에 따라 계층을 나눌 수 있다.

나는 물론 당신이 **클린 아키텍쳐**에서 예시로 드는 **Presentation**, **Domain**, **Data**라는 큰 패키지(broad packages) 혹은 모듈에 대해 알고 있으리라 생각한다. 이는 **어플리케이션 계층**이 도메인 패키지에 놓여있는 통상적인 3 티어의 **`PresentationDomainDataLayering`** 제안에 따른 것이다.

이때 나는 당신으로 부터 아래의 질문이 나올 것이라 본다:

> 도메인과 어플리케이션은 다르다면 어떻게 그들이 함께 있을 수 있나?

### 두 가지 "비즈니스 로직"

도메인과 어플리케이션 레이어는 비즈니스 로직을 반영하지만 그들은 본질적으로 두 가지로 나뉜다:

1. **도메인 비즈니스 로직**: 여기서 당신은 당신의 앱에서 다른 타입으로 나뉠 수 있는 모델들을 발견할 수 있다: 연관 객체들의 근원(Aggregate Roots), 엔티티(Entities), 밸류 오브젝트(Value Objects). 그리고 이들은 전사적 비즈니스 규칙을 실현한다..
2. **어플리케이션 비즈니스 로직**: 여기서 당신은 모델의 최상위에 존재하는 서비스, 유스케이스, 인터랙터라고 불리는 것들을 발견할 수 있다. 이들은 데이터 레이어의 "포트"에 해당하는 리포지토리 혹은 유스케이스를 사용해 도메인 모델을 조회하고 적재한다. 이들은 대체로 의존성 역전을 위해 사용되는데, 보통은 리포지토리 인터페이스에 해당한다. 만약 당신이 리포지토리에 대해 더 알고 싶다면 내 이전 포스트를 참조하라.

*`PresentationDomainDataLayering`*에서는 각각의 패키지는 각각의 화제(topic)을 반영한다: UI logic, 비즈니스 로직, 영속성 로직. *어플리케이션 레이어가 "얇다면" 도메인과 어플리케이션이 같이 묶일 수도 있고, 동일한 화제를 커버할 수 있기 때문이다. 하지만 클래스 또는 서브패키지 수준에선 여전히 차이가 있다*:

![Example of PresentationDomainDataLayering package structure](https://miro.medium.com/max/1332/1*aiQ9uRG1LtuiPu6fTcFCjw.png)

## 전지적 Presenters/ViewModels을 피할 것

우리가 적절히 관심사를 분리하지 않는다면 어떤 일이 발생할 것인가? 우린 전지적 객체(god objects)를 갖게 될 것이다.

*유스케이스가 존재하지 않는 ViewModel*과 *유스케이스가 존재하는 ViewModel*을 살펴보자.

### 유스케이스가 없을 경우

ViewModel은 아래와 같다:

```kotlin
class TransactionsViewModelImpl(
    private val userRepository: UserRepository,
    private val transactionRepository: TransactionRepository
) : TransactionsViewModel, ViewModel() {

    private val compositeDisposable = CompositeDisposable()

    override val transactions = MutableLiveData<List<Transaction>>()
    override val showProgress = MutableLiveData<Boolean>()
    override val showError = MutableLiveData<Boolean>()
    override val showContent = MutableLiveData<Boolean>()

    override fun loadTransactions() {
        when (val result = userRepository.getUser()) {
            is Result.Success -> loadUserTransactions(result.value)
            is Result.Failure -> setErrorState()
        }
    }

    private fun loadUserTransactions(user: User) {
        setLoadState()
        transactionRepository.getUserTransactions(user)
            .subscribeBy {
                handleResult(it)
            }.addTo(compositeDisposable)
    }

    private fun setLoadState() {
        showProgress.postValue(true)
        showError.postValue(false)
        showContent.postValue(false)
    }

    private fun handleResult(result: Result<List<Transaction>>) {
        when (result) {
            is Result.Success -> setContentState(result.value)
            is Result.Failure -> setErrorState()
        }
    }

    private fun setContentState(transactionsResult: List<Transaction>) {
        showContent.postValue(true)
        transactions.postValue(transactionsResult)
        showProgress.postValue(false)
        showError.postValue(false)
    }

    private fun setErrorState() {
        showError.postValue(true)
        showProgress.postValue(false)
        showContent.postValue(false)
    }

    override fun onCleared() {
        compositeDisposable.clear()
        super.onCleared()
    }

}
```

의존성은 아래와 같다:

```kotlin
// A wrapper for handling failing requests
sealed class Result<T> {

    data class Success<T>(val value: T) : Result<T>()

    data class Failure<T>(val throwable: Throwable) : Result<T>()

}

// The models (simplified)
data class User(val id: String)
data class Transaction(val id: String, val amount: Float)

// The repository for the transactions
interface TransactionRepository {
    fun getUserTransactions(user: User): Single<Result<List<Transaction>>>
}

// The repository for the user
interface UserRepository {
    fun getUser(): Result<User>
}
```

### 유스케이스가 있을 때

이제 유스케이스를 추가해보자:

```kotlin
// User
interface GetCurrentUserUseCase {
    operator fun invoke(): Result<User>
}

class GetCurrentUserUseCaseImpl(
    private val userRepository: UserRepository
) : GetCurrentUserUseCase {
    override fun invoke(): Result<User> = userRepository.getUser()
}

// Transaction
interface GetUserTransactionsUseCase {

    operator fun invoke(): Single<Result<List<Transaction>>>

}

class GetUserTransactionsUseCaseImpl(
    private val getCurrentUserUseCase: GetCurrentUserUseCase,
    private val transactionRepository: TransactionRepository
) : GetUserTransactionsUseCase {

    override fun invoke(): Single<Result<List<Transaction>>> {
        return when (val result = getCurrentUserUseCase()) {
            is Result.Success -> transactionRepository.getUserTransactions(result.value)
            is Result.Failure -> Single.just(Result.Failure(result.throwable))
        }
    }

}
```

이전의 모든 의존성은 그대로이지만 그들이 ViewModel이 아닌 유스케이스에 의해 사용되고 있다.

ViewModel을 살펴보자:

```kotlin
class TransactionsViewModelImpl(
    private val getUserTransactionsUseCase: GetUserTransactionsUseCase
) : TransactionsViewModel, ViewModel() {

    private val compositeDisposable = CompositeDisposable()

    override val transactions = MutableLiveData<List<Transaction>>()
    override val showProgress = MutableLiveData<Boolean>()
    override val showError = MutableLiveData<Boolean>()
    override val showContent = MutableLiveData<Boolean>()

    override fun loadTransactions() {
        setLoadState()
        getUserTransactionsUseCase()
            .subscribeBy {
                handleResult(it)
            }.addTo(compositeDisposable)
    }

    private fun setLoadState() {
        showProgress.postValue(true)
        showError.postValue(false)
        showContent.postValue(false)
    }

    private fun handleResult(result: Result<List<Transaction>>) {
        when (result) {
            is Result.Success -> setContentState(result.value)
            is Result.Failure -> setErrorState()
        }
    }

    private fun setContentState(transactionsResult: List<Transaction>) {
        showContent.postValue(true)
        transactions.postValue(transactionsResult)
        showProgress.postValue(false)
        showError.postValue(false)
    }

    private fun setErrorState() {
        showError.postValue(true)
        showProgress.postValue(false)
        showContent.postValue(false)
    }

    override fun onCleared() {
        compositeDisposable.clear()
        super.onCleared()
    }

}
```

우선 우리는 유스케이스에 감사를 표해야 할 것이다. 데이터 흐름 로직을 제거한 후 우리의 ViewModel이 훨씬 유연해졌기 때문이다.

또한 우리는 유스케이스가 없었던 첫번째 접근이 제대로 확장될 수 없었음을 발견할 수 있다. 만약 우리의 `TransactionRepository`가 다른 리포지토리로부터 오게 될 추가적인 파라미터가 필요해진다면, 리포지토리를 추가하고, 그에 따라 부가적인 성공/실패에 대한 로직도 추가되어야 할 것이다.

그리고 마지막으로 재사용성: 만약 당신이 다른 같은 데이터플로우 로직을 사용하는 ViewModel을 갖고 있었다면 당신은 동일한 유스케이스를 사용할 수 있게 되었으므로 유스케이스에 감사하자.

## 불필요한 유스케이스들

당신이 유스케이스를 사용하고, 많은 시간이 지난 후 당신은 아래와 같은 상황에 처하게 될 것이다:

```kotlin
class SomeUseCaseImpl(
    private val someRepository: SomeRepository
): SomeUseCase {    override fun invoke() = someRepository.getSomething()}
```

나 또한 이런 상황에 대해 잘 알고 있다. 유스케이스가 실제로 어떤 역할을 수행하고 있는 것보다 아무 일도 하지 않는 경우가 훨씬 일반적이다.

그럼에도, 그들이 리포지토리 메서드를 불러오는 것 외에 아무것도 하지 않는다고 하더라도 그들을 사용해야 할 다음의 몇 가지 이유가 있다.

### 첫째: 일관성

유스케이스를 사용하는 ViewModel이 리포지토리를 직접 불러오는 경우보다 더 나쁠까?

몇몇 경험없는 개발자들이나 신입들은 코드베이스에서 이들이 어떤 역할을 하고 있는지 이해하는데 오랜 시간이 걸릴 것이다.

### 둘째: 그들은 향후의 변경으로부터 코드를 보호

클린아키텍쳐의 목적 중 하나는 요구사항의 변화에 따라 쉽게 조정(adapt)할 수 있는 코드베이스를 제공하는 것이다. 이는 요구사항의 변화에 따라 변경되어야 할 코드가 언제나 최소한이어야 한다는 것을 의미한다.

아래 경우를 살펴보자:

```kotlin
interface SomeRepository {
    fun doSomething()
}

class SomeViewModel1(private val someRepository: SomeRepository) {
    //...
    fun doSomething() {
        //...
        someRepository.doSomething()
        //...
    }
    //...
}

class SomeViewModel2(private val someRepository: SomeRepository) {
    //...
    fun doSomething() {
        //...
        someRepository.doSomething()
        //...
    }
    //...
}

class SomeViewModel3(private val someRepository: SomeRepository) {
    //...
    fun doSomething() {
        //...
        someRepository.doSomething()
        //...
    }
    //...
}
```

당신이 볼 수 있듯, `SomeRepository`는 여러 곳에서 사용되고 있다.

만약 리포지토리의 변경이 요구된다면, 이를테면 `doSomething`이 이젠 `SomeOtherRepository`로부터 오게 될 모델을 사용해야만 한다면, 당신의 코드에 가해져야 할 변화는 얼마만큼인가?

얼마나 많은 ViewModels에 영향을 미칠 것인가?

만약 당신이 위 예시에서 유스케이스를 갖고 있었다면 당신은 단지 유스케이스의 실현(implementation)만 업데이트 해주면 된다.

### 셋째, "소리지르는 아키텍쳐"

> 당신의 앱이 하는 일이 무엇인가?

당신은 당신의 앱이 무슨 일을 하는지에 대해 작성한 어떠한 문서도 없을 것이다.

내 말 뜻을 오해하지 말라, 내 말 뜻은 당신이 응당 그걸 작성해야 했다는 것이 아니라 만약 내가 당신의 앱이 무슨 일을 하는지 알고 싶다면 내가 봐야 할 것이 무엇이냐는 것이다.

해답은 코드에 있다. *코드는 유일한 진리의 원천이다.*

당신의 프로젝트를 여는 것만으로 당신 앱이 하는 일을 알 수 있는가?

당신이 볼 대부분의 경우, 당신은 첫눈에 그걸 알아낼 수 없을 것이다.

이는 당신이 바닥부터 프로젝트를 만들었을 때는 문제가 되지 않을 것이다. 하지만 새로운 합류자라면? 그들이 해야 할 일을 어떻게 해야 할 지 알기까지 얼마나 오랜 시간이 걸릴 것인가?

이는 프로젝트의 구조가 다음과 같은 모양이 아닐 경우에는 쉽지 않은 일이 될 것이다.

![](https://miro.medium.com/max/1100/1*yfG7k-4hHe8rEkf1TkekEQ.png)

당신은 프로젝트 구조를 보는 것만으로 이 앱이 무슨 일을 하는지 말할 수 있겠는가? 프로젝트 구조가 "소리지른다"라는 것이 어떤 의미인가?

저건 단순한 은행 앱이다. 그리고 당신은 무엇을 할 수 있는가?

- 계정을 만들고 로그인하기
- 새 카드를 요청하고, 현재 카드를 정지시키기
- 지불을 생성하고 주문을 대기시키기
- 사용자가 생성한 모든 거래 내역을 받아오기

이제 당신은, 내가 예시를 위해 뻥을 좀 쳤지만, 실제 프로젝트는
위와 같은 사용례(Use Cases)로 설명할 수 있는 것보다 훨씬 많은 잡일(noise)들이 있을 것이다. 그럼에도 여전히 당신은 한눈에 저 앱이 무슨 일을 하는지 알아볼 수 있다.

업데이트: [이 문서에서](https://medium.com/swlh/functional-use-cases-f896f92e768f), 매우 기초적인 함수적 프로그래밍을 활용해 설계와 그 어떤 것도 절충하지 않으면서 대부분의 유스케이스가 필요로 하는 인터페이스나 쓸모 없는 유스 케이스와 같은 보일러 플레이트 코드들을 제거하는 방법에 대해 다루었다

## 하나의 리포지토리 메서드마다 하나의 유스케이스를?

이는 아주 일반적인 질문이다. 대답은? "그렇다" 이다.

당신이 보기에 이 대답은 너무 단순해보일 수도 있다. 하지만 문제는 대답에 있는게 아니다. 바로 질문 자체가 문제다.

당신은 당신이 이미 리포지토리 메서드를 갖고 있기 때문에 유스케이스를 만들지 않았다. 근데 당신이 만든 리포지토리 메소드는 유스케이스가 그걸 필요로 하기 때문에 만든 것이다.

클린아케텍쳐는 사실 유스케이스 주도적 아키텍쳐이다. 이런 이유로 각각의 리포지토리 메소드는 단지 유스케이스를 지원하기 위해 존재할 뿐이다.

또한 리포지토리 메소드는 반드시 하나의, 오직 하나의 유스케이스에 의해 사용되어야 한다는 것도 사실이다. 때문에 우리가 앱에서 유스케이스를 삭제한다면 그를 지원하는 영속성 로직또한 사라져야 한다.

"대체로" 각각의 리포지토리 메소드는 하나의 유스케이스를 갖게 된다고 말했다. 이는 하나의 유스케이스는, 앱이 단 하나의 유스케이스를 사용하는 것이 아닌 한 대체로 한 개 이상의 리포지토리를 사용하고, 한 개 이상의 리포지토리 메소드를 사용하기 대문이다.

## 정리

이제 이전의 몇 가지 질문들을 답변과 함께 살펴보자.

> Q: 유스케이스/인터랙터가 하고자 하는 것은 무엇인가?

A: 그들은 데이터플로우 로직을 실현한다.

> 왜 Presenter/ViewModel로부터 리포지토리를 직접 호출 할 수 없는 것인가?

A: 왜냐면 우리는 표현 로직(presentation logic)과 데이터플로우 로직을 모두 아우를 수 있는 전지적 객체를 피해야 하기 때문이다. 또한 우리는 데이터플로우 로직이 각기 다른 ViewModel들간에 재사용되길 바라기 때문이다.

> 왜 내가 리포지토리를 호출하는 용도 말고는 다른 용도가 없는 유스케이스를 만들어야 하는가? 이건 내 앱에 과도한 작업이 아닐까?

A: 왜냐면 일관성, 향후 변경으로부터 코드를 보호해야 하고, "소리지르는 아키텍쳐"를 위해서이다.

> 진짜 각각의 리포지토리 메서드에 대해 유스케이스를 만들어야 하는걸까?

A: 모든 경우에 대해서인 것은 아니다, 하지만 각각의 유스케이스는 적어도 하나의 리포지토리 메서드를 사용해야 한다.

부디 당신이 졸지 않고 이 글을 다 읽고, 유스케이스에 대해 좀 더 이해하는데 성공했길 바란다.
