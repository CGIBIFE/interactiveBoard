import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SocketService} from '../../service/socket.client';
import {CookieManager} from '../../service/cookie.service';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

    room: string;
    isAdmin: Boolean;
    users: any[] = [];
    userDetails: { name: string };
    questions: object;
    question: object;
    answered: boolean;
    channelEnded: boolean;
    showScoreBoard: boolean;
    myScore: string;

    // tslint:disable-next-line:max-line-length
    constructor(private route: ActivatedRoute, public socketService: SocketService, private cookieManager: CookieManager, private router: Router) {
    }

    ngOnInit() {
        this.socketService.userJoined().subscribe((name: string) => {
            this.users.push({name, 'score': 0});
        });
        this.route.params.subscribe(params => {
            this.room = params['name'].replace(/_/g, ' ');
        });

        this.socketService.adminStatus().subscribe(() => {
            // tslint:disable-next-line:no-unused-expression
            window.confirm('Owner of the channel left, do you like to leave ?') && this.router.navigate(['home']);
        });

        this.socketService.userStatus().subscribe((user) => {
            this.users = this.users.filter(usr => usr.name !== user.userName);
        });

        this.socketService.getQuestion().subscribe((question) => {
            this.answered = false;
            this.question = question;
        });

        this.socketService.checkAnswer().subscribe((answer) => {
            // tslint:disable-next-line:max-line-length no-unused-expression
            this.questions && this.questions.find(question => question.id === answer.question ).answer === answer.answer && this.users.find(user => user.name === answer.user).score ++;
        });

        this.socketService.channelStatus().subscribe((users) => {
            this.channelEnded = true;
     console.log(this.users.sort((a, b) => (a.score > b.score) ? 1 : -1 ))
            this.isAdmin ? this.showScoreBoard = true : this.myScore = users.users.find(user => user.name === this.userDetails.name).score;
        });


        this.userDetails = this.cookieManager.readCookie().userDetails;
        this.isAdmin = JSON.parse(this.cookieManager.readCookie().userDetails.isAdmin);
    }

    onQuestionUpload = (e) => {
        if (e.target.files[0].type === 'application/json') {
            const fileReader = new FileReader();
            fileReader.readAsText(e.target.files[0]);
            // tslint:disable-next-line:no-shadowed-variable
            fileReader.onload = e => {
                this.questions = JSON.parse(e.target['result']).questions;
            };
        }

    }

    sendQuestion(id): void {
        // @ts-ignore
        const {qes, ans} = this.questions.find(question => question.id === id);
        this.socketService.sendQuestion(this.room, qes, ans, id);
        // @ts-ignore
        // @ts-ignore
        this.questions.find(question => {
            if (question.id === id) {
               question.sentAlready = true;
            }
        });

    }

    submitAnswer(answer, question): void {
        this.answered = true;
        this.socketService.submitAnswer(this.room, answer, this.userDetails.name, question );
    }

    endChannel(): void {
        this.channelEnded = true;
        this.socketService.endChannel(this.room, this.users);
    }

    ngOnDestroy(): void {
        this.cookieManager.clearCookies();
        // tslint:disable-next-line:no-unused-expression
        this.isAdmin ? this.socketService.adminLeft(this.room) : this.socketService.userLeft(this.userDetails.name, this.room);

    }
}
