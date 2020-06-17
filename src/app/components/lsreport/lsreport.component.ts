import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { DataService } from '../../services/data.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


declare var require: any;
var Highcharts = require('highcharts/highcharts.js')

@Component({
  selector: 'app-lsreport',
  templateUrl: './lsreport.component.html',
  styleUrls: ['./lsreport.component.css']
})

export class LSReportComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    public lrId: any;
    
    public lsr: any;    
    public ivls: any;
    public literature: any;
    public adqLiterature: any;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private title: Title
    ) { 
        this.lrId = this.route.snapshot.params.lrId;
        this.blockUI.start();
        
        this.literature = {
            theme_notes: {
                "Energizers": "<p>Energizers inspire or evoke a response from you.Accompanied with a sense of aliveness and flow, energizers offer internal resources, hopes, and even provocations that enable you to engage with new actions, choices. Energizers are a product of interplay between your inner needs and desires and the nature of the context in which these can be either played out or curbed. In other words, these are evoked, provoked or inhibited.</p><p>You are likely to be energized in a context</p>",
                "Relation with People": "<p>Relationships with People are one's nature of interface and patterns of relatedness and relationships with people at large including friends, family, colleagues and strangers.</p><p>In your relationships with people, you are likely to</p>",
                "Relation with Systems": "<p>Relationship with Systems would mean the nature of your interface with authority, roles, structure, tasks, goals, rules, policy, boundaries, values, responsibilities, power, peerage, and interdependence.Systems would include predominantly sentient systems such as your family as well as task systems such as your workplace.</p>",
                "Decision Making and Conflict Resolution": "<p>By Decision Making, we refer to your inner world of thoughts and feelings that impact your action choices, for yourself and /or your systems.By Conflict, we refer to a diverse set of perspectives, demands - both legitimate and illegitimate, values, and philosophy that create pulls and pushes in you.</p>",
                "Managing Change": "<p>By Managing Change, we mean the way you may engage with discontinuities, breaks or paradigm shifts - the role you are likely to play in the process and the significant factors that are likely to influence you.</p><p>In dealing with change, you are likely to</p>",
                "Derailers": "<p>Relationship with Systems would mean the nature of your interface with authority, roles, structure, tasks, goals, rules, policy, boundaries, values, responsibilities, power, peerage, and interdependence.Systems would include predominantly sentient systems such as your family as well as task systems such as your workplace.</p>"
            },
            universe_names: {
                "UBP": "Universe of Belonging and Protection",
                "USD": "Universe of Strength and Desire",
                "URB": "Universe of Roles and Boundaries",
                "UPA": "Universe of Purpose and Achievement",
                "UMI": "Universe of Meaningfulness and Intimacy",
                "UDS": "Universe of Duality and Simultaneity"
            },
            universe_notes: {
                "UBP":"<p>This is the part of us that wishes to belong to a safe haven where we feel secure and protected. Its primary orientation is towards familiarity, predictability, harmony, and strong bonding/identification with our own kith and kin. It enables us to have trust and faith in our people, abide by the established norms and customs, and experience a sense of pride in our heritage. It gives us a strong sense of “oneness” with the group(s) we belong to, and enables us to accept all its positives as also its angularities.</p><p>When this orientation is subdued, it leaves us feeling rootless and not having a sense of “home”. On the other hand, when this orientation is excessive in us, it generates a fear of the unknown, mistrust of “outsiders”, and fear of disturbance. Consequently, we become closed to new experience/learning and hence become somewhat like a “frog in the well”.<br /></p>",
                "USD":"<p>This is the part of us that is focused on fulfilment of our desires and seeks to do so through our own strength and power. Its primary orientation is towards curiosity, assertion, adventure, aliveness, excitement and competitiveness. It enables us to dream for ourselves, invest in developing our strength and power, question the established ways of our context, venture out in the world, undertake heroic journeys, expand our horizons, and have a sense of dominance over the world.</p><p>When this orientation is subdued, it becomes difficult for us to identity our needs and wishes, assert our own position, engage with conflict/aggression, and have self-belief. On the other hand, when this orientation is excessive, we tend to look at other people either as potential enemies to be conquered or as objects for our need fulfilment/self aggrandizement. It also gives us an unrealistic and exaggerated idea of our strength and may leave us unwilling to acknowledge our vulnerabilities and limitations.</p>",
                "URB":"<p>This is the part of us that wishes to relate with the world in an orderly fashion so that we know what exactly to expect from others and what is expected of us. Its primary orientation is towards smooth functioning, balance, clarity, adjustment, and appropriateness. It enables us to have a sense of proportion, to respect other people’s boundaries while protecting our own, and to be able to look at situations without getting influenced by our feelings and prejudices. It also enables us to accept that our lives are intertwined with other people's and it is only when each of us performs his/her appointed role in an appropriate manner that we can peacefully co-exist.</p><p>Thus, in this universe we attempt to work out appropriate systems and processes to deal with different situations, instil in ourselves and in others a sense of discipline, and ensure adherence to mutually agreed rules, norms, and systems.</p><p> When this orientation is subdued, it becomes difficult for us to adhere to any systemic discipline and all rules and regulations appear to be unnecessary impediments. On the other hand, when this orientation is excessive, we become sticklers for rules, dogmatic, rigid, over-controlling, inhibited in our expression, and intolerant of any deviance/alternative perspectives.<br /></p>",
                "UPA":"<p>This is the part of us that continually strives towards higher levels of achievement and recognizes that this is possible only by forging mutually beneficial links with others. Its primary orientation is towards purposiveness, goal directed action, enlightened self-interest, and resourcefulness. It enables us to invest in our own capabilities as also respect the capabilities / resourcefulness of others in a way that it can help us to accomplish our goals. Who the other is, and what we feel about him / her becomes less important than what he / she brings to the table. Simultaneously, it makes us recognize that the world values us not for who we are, but what we have to offer. Finally, it helps us to relate with others both in a collaborative and competitive manner.</p><p> When this orientation is subdued, we experience a sense of drift, self-waste and aimlessness. It also becomes difficult for us to own up our ambitions and/or work towards their fulfillment. When this part is overly dominant, it makes us look at others (as also ourselves) only as instruments of performance / utility and hence feel an inner isolation, loss of human touch, expression of joys and sorrows, fear of obsolescence, feeling burnt out, and being in a constant state of “over drive”.</p>",
                "UMI":"<p>This is the part of us that wishes for and works towards a utopian world where everyone can live in peace and harmony. Its primary orientation is towards meaningfulness, intimacy, compassion, empathy and respect for others irrespective of their clan and creed. It enables us to feel one with the larger human context, transcend the preoccupations of ourselves/our subgroup(s), and dream collectively for a world that ensures a higher level of well being for all. It also helps us to accept others and ourselves at a human level beyond issues of class, category, ethnicity, etc.</p><p>When this orientation is subdued we experience ourselves as self absorbed, devoid of empathy and compassion, consumptive, dry and alone. On the other hand, when it is excessive, we become impractical and are unable to accept that strife is as important for human existence as is harmony. Consequently, our tolerance for anything that disrupts our idyllic scenario becomes low and we wish to either ignore it or suppress it.<br /></p>",
                "UDS":"<p>There are several parts of us that are often at play simultaneously. While they may blend in perfect harmony at times, at other times they may also create severe conflicts and pull us in different directions. Thus our need for harmony may come in the way of our need for achievement, or our need for dominance may come in the way of our need for intimacy, or our need for safety may come in the way of our need for adventure. The list is endless. Simultaneous engagement with these multiple pulls is the essence of this universe. Its primary orientation is towards being in the “here and now”; acceptance of all the different aspects of human existence without judgment and acting on the basis of what seems right in any given situation. It enables us to live with uncertainty; ambiguity and seemingly contradictory pulls without letting one aspect overwhelm the other.</p><p>When this orientation is subdued, it makes it difficult for us to live with the inherent uncertainties and ambiguities of life. We tend to become excessively preoccupied either with the past or with the future and are unable to engage fully with the present. Simultaneously, we may become unifocal and start seeking refuges in achievement, or in relationships, or in power, or in knowledge, or even in the idea of God. On the other hand when this orientation is excessive, it can come in the way of our experiencing the various parts of ourselves in their full intensity. It can also become an escape route from the need to take clear positions and making commitments.</p>"
            },
            aq_para1: {
                "a": "You have chosen positive values in each area. This indicates that you are able to lead a balanced and fulfilled life. It is rare that we see this.",
                "b":"<p>From the values you selected it is clear that you operate across a number of areas and are therefore adaptable and able to focus on supporting the common good as well as your own self interests. </p>",
                "c_1":"<p>From the values you selected it is clear that you are a person who wants to feel secure in the world. If these needs are threatened or not met you will experience anxiety about not feeling safe or not having enough. </p>",
                "c_2":"<p>From the values you selected having close relationships and connections with others is important to you. You need to feel a sense of love and belonging. If these needs are threatened or not met you will experience anxiety about not being accepted or not being loved enough.</p>",
                "c_3":"<p>From the values you selected it is clear that it is important to you that you feel a sense of self-worth. If this need is not met you will experience anxiety about not being enough.</p>",
                "c_4":"<p>From the values you selected it is clear that you seek to uncover more of your authentic self by looking to develop and grow. You are starting to overcome your anxieties and fears.</p>",
                "c_5":"<p>From the values you selected it is clear that you are a person for whom meaning is important. You have a strong set of moral standards which are important in how you treat others and how you wish to be treated. </p>",
                "c_6":"<p>From the values you selected it is clear that you are starting to really live your sense of purpose and are cooperating with others for mutual benefit and fulfillment. </p>",
                "c_7":"<p>From the values you selected it is clear that it is important to you that you devote your life to serving others in pursuit of your passion or purpose and vision.</p>"
            },
            aq_para3: 'Understanding our values helps us better understand ourselves and why we may act or react in the way that we do. For example, if someone undermines one of your values it can result in feelings of hurt; you would be likely to feel upset if your value of "caring" was not being honored by someone else.Similarly, if you make a decision which goes against one of your values this may lead you to feel uneasy or unsettled about the decision, because you are not being true to yourself. '
        };

        this.ivls = [
            {'id': 1, 'level': 7, 'label': 'Self-less Service', 'color': '#374656', 'bubbles': [] },
            {'id': 2, 'level': 6, 'label': 'Making a positive difference in the world', 'color': '#4A5F78', 'bubbles': [] },
            {'id': 3, 'level': 5, 'label': 'Finding meaning in existence', 'color': '#5E799A', 'bubbles': [] },
            {'id': 4, 'level': 4, 'label': 'Letting go of fears. The courage to develop and grow', 'color': '#86946B', 'bubbles': [] },
            {'id': 5, 'level': 3, 'label': 'Feeling a sense of self-worth', 'color': '#D59F5F', 'bubbles': [] },
            {'id': 6, 'level': 2, 'label': 'Feeling protected and loved', 'color': '#CD9757', 'bubbles': [] },
            {'id': 7, 'level': 1, 'label': 'Satisfying our physical and survival needs', 'color': '#B32C30', 'bubbles': [] }
        ];

        this.adqLiterature = [];
        
        $('body').addClass('print');
    }

  	ngOnInit() {

	   	this.dataService.getLeadershipReport(this.lrId).subscribe(
	        data => {
                this.lsr = data.lsr;
                //console.log(data);
                this.title.setTitle('Pulse Leadership Report - ' + this.lsr.employee.first_name + ' ' + this.lsr.employee.last_name);
                this.blockUI.stop();
                this.loadUniChart();
                this.setupBubblesData();
                this.setupADQLiterature();
	        },
	        err => {
	            console.log("inside Universe details error", JSON.stringify(err.message));
	            alert(JSON.stringify(err.message));
                this.blockUI.stop();
        });
                
      }
      
      setupBubblesData() {
        for(let userdata of this.lsr.cva_answers) {
            let mvalue = this.lsr.values.find(v => v.value.toLowerCase() === userdata.answer.toLowerCase());
            if(mvalue !== undefined) {
                userdata.level = mvalue.level;
                userdata.state = mvalue.pvlv;
                userdata.option = mvalue.option;
                userdata.option2 = mvalue.option2;
                for(let ivl of this.ivls) {
                    if(Number(ivl.level) === Number(mvalue.level)) {
                        ivl.bubbles.push({'label': mvalue.value, 'state': mvalue.pvlv});
                    }
                }
            }
        //     for(let mdata of this.values) {
        //         if(userdata.answer == mdata.value){
        //             this.userSelAns.push(mdata);
        //             this.ivls[mdata.level - 1].bubbles.push({'label':mdata.value,'state':mdata.pvlv});

        //         }
        //    } 

        }
      }

setupADQLiterature() {

    this.adqLiterature[0] = '';
    this.adqLiterature[1] = [];
    this.adqLiterature[2] = this.literature.aq_para3;
    this.adqLiterature[3] = [];

    let all_positive = true; let full_levels = true; let three_levels = true;
    for(let ans of this.lsr.cva_answers) {
        if(ans.state === 'LV') { all_positive = false; }
        // generate 2nd paragraph
        if(ans.option !== null && ans.option !== '') {
            this.adqLiterature[1].push(ans.option);
        }
        // generate 4th paragraph
        if(ans.option2 !== null && ans.option2 !== '') {
            this.adqLiterature[3].push(ans.option2);
        }
    }

    for(let ivl of this.ivls) {
        if(ivl.bubbles.length === 0) { full_levels = false; }
        if(ivl.bubbles.length > 3) { three_levels = false; }
    }

    // generate 1st paragraph

    if(all_positive && full_levels) { this.adqLiterature[0] = this.literature.aq_para1.a; }
    else if(three_levels) { this.adqLiterature[0] = this.literature.aq_para1.b; }
    else if(this.ivls[6].bubbles.length > 3) { this.adqLiterature[0] = this.literature.aq_para1.c_1; }
    else if(this.ivls[5].bubbles.length > 3) { this.adqLiterature[0] = this.literature.aq_para1.c_2; }
    else if(this.ivls[4].bubbles.length > 3) { this.adqLiterature[0] = this.literature.aq_para1.c_3; }
    else if(this.ivls[3].bubbles.length > 3) { this.adqLiterature[0] = this.literature.aq_para1.c_4; }
    else if(this.ivls[2].bubbles.length > 3) { this.adqLiterature[0] = this.literature.aq_para1.c_5; }
    else if(this.ivls[1].bubbles.length > 3) { this.adqLiterature[0] = this.literature.aq_para1.c_6; }
    else if(this.ivls[6].bubbles.length > 3) { this.adqLiterature[0] = this.literature.aq_para1.c_7; }

    


}

loadUniChart() {
    var series = [
        { name: 'SC', dashStyle: 'longdash', color: '#0000FF', data: [] },
        { name: 'SI', dashStyle: 'longdash', color: '#FF0040', data: [] },
        { name: 'Others', dashStyle: 'longdash', color: '#FFDB00', data: [] }
    ];
    var categories = [];

    for(let uni of this.lsr.universes) {
        categories.push(uni.universe_code);
        series[0].data.push([uni.universe_code, Number(uni.sc)]);
        series[1].data.push([uni.universe_code, Number(uni.si)]);
        series[2].data.push([uni.universe_code, Number(uni.others)]);
    };

    Highcharts.chart('uni_chart', {
        chart: {
            type: 'line',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        credits: {
		    enabled: false
		},
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
        	categories: categories
        },
         yAxis:{
            min: 0, max: 60,
             lineWidth: 1,
            title: false
            },
        plotOptions: {
            line: {
                innerSize: 100,
                depth: 15
            }
        },
        series: series
    });
  }

}
